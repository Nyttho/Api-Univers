import { Router } from "express";
import { authUser, logoutUser } from "../controllers/auth.js";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Routes des authentifications
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authentification de l'utilisateur
 *     description: Permet à un utilisateur de se connecter en utilisant ses identifiants (login et mot de passe).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie - L'utilisateur est authentifié et un token est renvoyé.
 *       400:
 *         description: Mauvais identifiants - L'email ou le mot de passe est incorrect.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Déconnexion de l'utilisateur
 *     description: Permet à l'utilisateur de se déconnecter en supprimant le token d'authentification.
 *     responses:
 *       200:
 *         description: Déconnexion réussie - Le token a été supprimé.
 *       500:
 *         description: Erreur interne du serveur.
 */

authRouter.post("/", authUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
