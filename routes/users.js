import { Router } from "express";
import {
  deleteOneUser,
  getAllUsers,
  getOneUser,
  registerUser,
  updateOneUser,
} from "../controllers/users.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Routes des utilisateurs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupérer tous les utilisateurs
 *     description: Permet de récupérer la liste de tous les utilisateurs. Le token d'authentification est attendu dans les cookies sous le nom 'token'.
 *     responses:
 *       200:
 *         description: Utilisateurs récupérés avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */
userRouter.get("/", getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupérer un utilisateur spécifique
 *     description: Permet de récupérer un utilisateur spécifique en fonction de son ID. Le token d'authentification est attendu dans les cookies sous le nom 'token'.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
userRouter.get("/:id", getOneUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Mettre à jour un utilisateur spécifique
 *     description: Permet de mettre à jour un utilisateur spécifique en fonction de son ID. L'authentification est requise via un cookie contenant le token sous le nom 'token'.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour.
 *         schema:
 *           type: string
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
 *               username:
 *                 type: string
 *                 example: "newUsername"
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       403:
 *         description: Accès interdit - Vous n'êtes pas autorisé à modifier cet utilisateur.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
userRouter.put("/:id", isAuth, updateOneUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Supprimer un utilisateur spécifique
 *     description: Permet de supprimer un utilisateur spécifique en fonction de son ID. L'authentification est requise via un cookie contenant le token sous le nom 'token'.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à supprimer.
 *         schema:
 *           type: string
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       403:
 *         description: Accès interdit - Vous n'êtes pas autorisé à supprimer cet utilisateur.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
userRouter.delete("/:id", isAuth, deleteOneUser);

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Inscription d'un utilisateur
 *     description: Permet à un utilisateur de s'inscrire en fournissant un email et un mot de passe. Aucun token n'est nécessaire pour cette route.
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
 *               username:
 *                 type: string
 *                 example: "newUser"
 *     responses:
 *       201:
 *         description: Utilisateur inscrit avec succès.
 *       400:
 *         description: Mauvaise demande - Le corps de la requête est incorrect ou les informations sont déjà utilisées.
 *       500:
 *         description: Erreur interne du serveur.
 */
userRouter.post("/signup", registerUser);

export default userRouter;
