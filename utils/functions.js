import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const JWT_SECRET = process.env.JWT_SECRET;
//1 heure pour l'exercice, sinon 15 minutes
const ACCESS_JWT_EXPIRATION = "1h";

export const sendResponse = (res, status, message, payload = null) => {
  const response = { message, ...(payload || {}) };
  res.status(status).json(response);
};

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, admin: user.is_admin },
    JWT_SECRET,
    {
      expiresIn: ACCESS_JWT_EXPIRATION,
    }
  );
};

export const convertDurationToMs = (duration) => {
  const units = {
    s: 1000,
    m: 1000 * 60,
    h: 1000 * 60 * 60,
    d: 1000 * 60 * 60 * 24,
  };
  const unit = duration.slice(-1);
  const value = parseInt(duration.slice(0, -1), 10);
  return value * units[unit];
};

export const deleteImage = (imageName) => {
  try {
    // Définir le chemin du dossier "images" à la racine de votre projet
    const imagePath = path.resolve("images", imageName);

    // Vérifie si le fichier existe
    if (!fs.existsSync(imagePath)) {
      throw new Error(
        `L'image ${imageName} n'existe pas dans le dossier "images"`
      );
    }

    // Supprime l'image
    fs.unlinkSync(imagePath);
    console.log(`L'image ${imageName} a été supprimée avec succès.`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'image :", error.message);
    throw error;
  }
};
