import Universe from "../models/Universe.js";
import * as IA from "../utils/ia.js";
import { deleteImage } from "../utils/functions.js";

export const getAllUniverses = async (req, res) => {
  try {
    const universes = await Universe.getAll();
    if (universes.length === 0) {
      return res.status(404).json({ error: "There are no universe yet" });
    }
    return res.status(200).json({ universes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneUniverse = async (req, res) => {
  try {
    const id = req.params.id;
    const universe = await Universe.getById(id);
    if (!universe) {
      return res.status(404).json({ error: "Universe not found" });
    }
    return res.status(200).json({ universe });
  } catch {
    return res.status(500).json({ error: error.message });
  }
};

export const createOneUniverse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    // Vérification si l'univers existe déjà
    const existingUniverse = await Universe.getByName(name);
    if (existingUniverse) {
      return res.status(409).json({ error: "Universe already exists" });
    }

    // Génération du prompt pour obtenir une description
    const promptToGroq = IA.generatePrompt("universe", name);
    const description = await IA.callGroqAI(promptToGroq); // Appel asynchrone

    // Génération du prompt pour obtenir une image
    const promptToClipBoard = IA.generateImagePrompt(description);
    const imageUrl = await IA.callClipBoardAI(promptToClipBoard, req); // Appel asynchrone

    // Création du nouvel univers
    const newUniverse = {
      name: name,
      description: description,
      image_url: imageUrl,
      created_by: userId,
    };
    const createdUniverse = await Universe.create(newUniverse); // Création en base

    // Retour de l'univers créé
    return res.status(201).json({
      message: "Universe created successfully",
      universe: createdUniverse,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'univers :", error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateOneUniverse = async (req, res) => {
  try {
    const userId = req.user.id;
    const universeId = req.params.id;
    const { name, description } = req.body;

    const universe = await Universe.getById(universeId);
    if (!universe) {
      return res.status(404).json({ error: "Universe don't exists" });
    }

    if (universe.created_by !== userId) {
      return res
        .status(403)
        .json({ error: "You're not allowed to update this universe" });
    }

    await Universe.update(universeId, { name, description });
    return res.status(200).json({ message: "Universe updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneUniverse = async (req, res) => {
  try {
    const universeId = req.params.id;
    const userId = req.user.id;

    const universe = await Universe.getById(universeId);

    if (!universe) {
      return res.status(404).json({ error: "Universe don't exists" });
    }

    if (universe.created_by !== userId) {
      return res
        .status(403)
        .json({ error: "You're not allowed to delete this universe" });
    }

    const imageName = universe.image_url.split("/").pop();
    await Universe.delete(universeId);
    deleteImage(imageName);

    return res.status(200).json({ message: "Universe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
