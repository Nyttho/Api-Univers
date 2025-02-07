import Character from "../models/Character.js";
import Universe from "../models/Universe.js";
import * as IA from "../utils/ia.js";
import { deleteImage } from "../utils/functions.js";

export const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.getAll();
    if (characters.length === 0) {
      return res.status(404).json({ error: "There are no characters yet" });
    }
    return res.status(200).json({ characters });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllCharactersFromUniverse = async (req, res) => {
  try {
    const universeId = req.params.id;
    const universe = await Universe.getById(universeId);
    if (!universe) {
      return res.status(404).json({ error: "Universe not found" });
    }

    const characters = await Character.getAllByUniverseId(universeId);
    if (characters.length === 0) {
      return res.status(404).json({ error: "characters not found" });
    }

    return res.status(200).json({ characters });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneCharacter = async (req, res) => {
  try {
    const id = req.params.id;
    const character = await Character.getById(id);
    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }
    return res.status(200).json({ character });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createOneCharacter = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, universeName } = req.body;
    const universe = await Universe.getByName(universeName);
    if (!universe) {
      res.status(404).json({ error: "Universe not found" });
    }

    const promptToGroq = IA.generatePrompt("character", name, universeName);
    const description = await IA.callGroqAI(promptToGroq); // Appel asynchrone

    const promptToClipBoard = IA.generateImagePrompt(description);
    const imageUrl = await IA.callClipBoardAI(promptToClipBoard, req); // Appel asynchrone

    // const [description, imageUrl] = IA.generateImage(
    //   "character",
    //   name,
    //   universeName,
    //   req
    // );

    const newCharacter = {
      name,
      description,
      universe_id: universe.id,
      created_by: userId,
      image_url: imageUrl,
    };

    const createdCharacter = await Character.create(newCharacter);

    return res.status(201).json({
      message: "Character created successfullly",
      character: createdCharacter,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOneCharacter = async (req, res) => {
  try {
    const userId = req.user.id;
    const characterId = req.params.id;
    const { name, description, universeName } = req.body;

    const universe = await Universe.getByName(universeName);
    const character = await Character.getById(characterId);

    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    if (!universe) {
      return res.status(404).json({ error: "Universe not found" });
    }

    if (character.created_by !== userId) {
      return res
        .status(403)
        .json({ error: "You're not allowed to update this character" });
    }

    await Character.update(characterId, {
      name,
      description,
      universe_id: universe.id,
    });
    res.status(200).json({ message: "Character updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneCharacter = async (req, res) => {
  try {
    const characterId = req.params.id;
    const userId = req.user.id;
    const character = await Character.getById(characterId);

    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    if (character.created_by !== userId) {
      res
        .status(403)
        .json({ error: "You're not allowed to delete this character" });
    }

    await Character.delete(characterId);
    const imageName = character.image_url.split("/").pop();
    deleteImage(imageName);
    res.status(200).json({ message: "Character deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
