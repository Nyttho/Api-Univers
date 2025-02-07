import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/functions.js";

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_JWT_EXPIRATION = "15m";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, admin: user.is_admin },
    JWT_SECRET,
    {
      expiresIn: ACCESS_JWT_EXPIRATION,
    }
  );
};

export const isAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return sendResponse(res, 401, "Access token is missing");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return sendResponse(res, 403, "Invalid or expired access token");
    }

    // Stocker les informations utilisateur dans req.user
    req.user = user;

    // Générer un nouveau jeton
    const newToken = generateAccessToken(user);

    // Définir le nouveau jeton dans un cookie
    res.cookie("accessToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 15 * 60 * 1000, // Correspond à ACCESS_JWT_EXPIRATION
    });

    next();
  });
};

export default isAuth;
