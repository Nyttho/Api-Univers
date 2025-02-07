import bcryptjs from "bcryptjs"; // Re-ajout de bcryptjs
import User from "../models/User.js"; // Importation de la classe User

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.getById(id);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOneUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id); // ID de l'utilisateur à mettre à jour
    const tokenId = req.user.id; // ID de l'utilisateur authentifié
    const isAdmin = req.user.admin; // Rôle de l'utilisateur authentifié

    const { is_admin, ...updateFields } = req.body; // Séparer les champs sensibles (comme `is_admin`)

    // Vérifier si l'utilisateur existe
    const existingUser = await User.getById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vérifier si l'utilisateur a les droits pour effectuer la modification
    if (!isAdmin && userId !== tokenId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this user" });
    }

    // Empêcher les utilisateurs non-admin de modifier leur rôle
    if (!isAdmin && is_admin !== undefined) {
      return res.status(403).json({ message: "You can't change your role" });
    }

    // Définir les champs à mettre à jour
    const fieldsToUpdate = isAdmin ? req.body : updateFields;

    // Mettre à jour l'utilisateur
    const updatedUser = await User.update(userId, fieldsToUpdate);

    // Retourner l'utilisateur mis à jour
    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tokenId = req.user.id;

    const existingUser = await User.getById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (id !== tokenId) {
      return res
        .status(403)
        .json({ message: "You're not authorized to delete this user" });
    }

    await User.delete(id);

    return res.status(200).json({ message: "User deleted succesfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Inscription d'un utilisateur
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    // Créer l'utilisateur
    await User.create(newUser);

    // Retourner l'utilisateur créé
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    return res.status(500).json({ error: error.message });
  }
};
