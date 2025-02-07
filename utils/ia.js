//groq api
//https://console.groq.com/playground

//https://clipdrop.co/apis/docs/text-to-image

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export const callGroqAI = async (msg) => {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: msg,
          },
        ],
      }),
    });

    // Vérifie si la réponse est OK
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    // Parse la réponse JSON
    const datas = await res.json();
    return datas.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Text AI API:", error.message);
    throw error;
  }
};

export const callClipBoardAI = async (msg, req) => {
  // Vérification de l'objet req
  if (!req || !req.protocol || !req.get) {
    throw new Error("L'objet 'req' n'est pas correctement passé ou défini.");
  }

  const form = new FormData();
  form.append("prompt", msg);

  try {
    // Appel à l'API ClipDrop
    const res = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      body: form,
    });

    // Vérification de la réponse de l'API
    if (!res.ok) {
      const errorText = await res.text(); // Pour obtenir les détails de l'erreur
      throw new Error(`Erreur API ClipDrop : ${res.status} - ${errorText}`);
    }

    // Récupération de l'image en tant que buffer
    const imageBuffer = await res.buffer();

    // Chemin absolu du dossier 'images' à la racine du projet
    const outputFolder = path.resolve("images"); // Dossier 'images' à la racine
    const fileName = `image_${Date.now()}.png`; // Nom unique basé sur la date actuelle
    const filePath = path.join(outputFolder, fileName);

    // Création du dossier s'il n'existe pas
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    // Sauvegarde de l'image sur le serveur
    fs.writeFileSync(filePath, imageBuffer);

    // Construction de l'URL pour accéder à l'image
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    return imageUrl; // URL de l'image générée
  } catch (error) {
    // Gestion des erreurs
    console.error(
      "Erreur lors de l’appel à ClipDrop ou de la sauvegarde de l’image :",
      error.message
    );
    throw error; // Relancer l'erreur pour la gestion en amont
  }
};
/**
 * Fonction pour générer un prompt basé sur un univers ou un personnage existant
 * @param {string} type - Type de génération (ex. "univers", "personnage")
 * @param {string} name - Nom de l'univers ou du personnage
 * @param {string} [universe] - Univers de fiction auquel le personnage appartient (optionnel pour 'univers')
 * @returns {string} - Prompt généré
 */
export const generatePrompt = (type, name, universe = null) => {
  if (!type || !name) {
    throw new Error("Type and name are required.");
  }

  let prompt = "";

  switch (type.toLowerCase()) {
    case "universe":
      prompt = `Describe the fictional universe "${name}" in detail in less than 800 characters. 
  Explain its key characteristics, lore, geography, and cultural aspects. 
  Include elements that make "${name}" unique and captivating.`;
      break;

    case "character":
      if (!universe) {
        throw new Error(
          "L'univers est obligatoire pour générer un prompt pour un personnage."
        );
      }
      prompt = `Describe the fictional character "${name}" from the universe "${universe}" in less than 800 characters. 
  Detail their appearance, personality, backstory, and role within the universe. 
  Highlight what makes them a unique and essential part of "${universe}".`;
      break;

    default:
      throw new Error("Type non supporté. Utilisez 'univers' ou 'personnage'.");
  }

  return prompt;
};

/**
 * Fonction pour générer un prompt d'image à partir d'une description
 * @param {string} description - La description textuelle renvoyée par l'IA
 * @returns {string} - Prompt optimisé pour la génération d'images
 */
export const generateImagePrompt = (description) => {
  if (!description) {
    throw new Error("description is required.");
  }

  // Transformation de la description en un prompt visuel
  const visualPrompt = `
        Create an artistic representation based on the following description:
        "${description}".
        Focus on capturing detailed visual elements, such as colors, lighting, textures, and specific design aspects. 
        Make it visually stunning, with a realistic or stylized approach suitable for a fantasy or fictional world.
    `;

  return visualPrompt.trim();
};

export const generateImage = async (type, name, universe = null, req) => {
  const promptToGroq = generatePrompt(type, name, universe);
  const description = await callGroqAI(promptToGroq);

  const promptToClipBoard = generateImagePrompt(description);
  const imageUrl = await callClipBoardAI(promptToClipBoard, req);

  return [description, imageUrl];
};

export const characterConversation = (character, userMessage) => {
  const prompt = `
    You are ${character.name}, a character from the universe ${character.universe}.
    Your description: ${character.description}.
    Respond to the following message with  as ${character.name}. Always stay in character.
    
    If the user's message is inappropriate, remind them of proper behavior and set boundaries, but do so in a way that aligns with ${character.name}'s personality and tone.

    Always reply in the same language used by the user in their message.
    
    User: ${userMessage}
    ${character.name}: 
  `;
  return prompt;
};

export const getCharacterResponse = async (character, userMessage) => {
  const prompt = characterConversation(character, userMessage);
  const response = await callGroqAI(prompt); // Assuming callGroqAI is the function to call your AI
  return response;
};
