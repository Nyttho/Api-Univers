import User from "../models/User.js";
import {
  generateAccessToken,
  convertDurationToMs,
} from "../utils/functions.js";
import { sendResponse } from "../utils/functions.js";
import bcryptjs from "bcryptjs";

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.getByEmail(email);
    if (!user) {
      return sendResponse(res, 400, "Invalid credentials");
    }

    // Vérifier le mot de passe
    // const isPasswordValid = await User.verifyPassword(user, password);
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 400, "Invalid credentials");
    }

    // Générer les tokens
    const accessToken = generateAccessToken(user);

    // Définir les cookies
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: convertDurationToMs("15m"),
    });

    const { name, is_admin } = user;
    const cleanedUser = { name, is_admin };

    // Répondre avec succès
    sendResponse(res, 200, "Authentication successful", { user: cleanedUser });
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error.message);
    sendResponse(res, 500, "Error during authentication", {
      error: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    // Répondre avec succès
    sendResponse(res, 200, "Logout successful");
  } catch (error) {
    sendResponse(res, 500, "Error during logout", { error: error.message });
  }
};
