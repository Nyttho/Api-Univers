import { Router } from "express";
import {
  getAllMessages,
  createMessage,
  updateLastMessage,
} from "../controllers/message.js";
import isAuth from "../middlewares/isAuth.js";

const messageRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Messages
 *     description: Routes des messages
 */

/**
 * @swagger
 * /api/message/conversation/{id}:
 *   get:
 *     tags:
 *       - Messages
 *     summary: Récupérer tous les messages d'une conversation
 *     description: Permet de récupérer tous les messages d'une conversation spécifique en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la conversation pour récupérer ses messages.
 *         schema:
 *           type: string
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Messages récupérés avec succès.
 *       404:
 *         description: Conversation non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/message/conversation/{id}:
 *   post:
 *     tags:
 *       - Messages
 *     summary: Créer un message dans une conversation
 *     description: Permet de créer un nouveau message dans une conversation spécifiée par son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la conversation à laquelle ajouter le message.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "C'est un nouveau message !"
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Message créé avec succès.
 *       400:
 *         description: Mauvaise demande - Le corps de la requête est incorrect.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/message/{id}:
 *   put:
 *     tags:
 *       - Messages
 *     summary: Mettre à jour le dernier message d'une conversation
 *     description: Permet de mettre à jour le dernier message de l'IA d'une conversation en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du dernier message à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Message mis à jour."
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dernier message mis à jour avec succès.
 *       404:
 *         description: Message non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

messageRouter.get("/conversation/:id", isAuth, getAllMessages);
messageRouter.post("/conversation/:id", isAuth, createMessage);
messageRouter.put("/:id", isAuth, updateLastMessage);

export default messageRouter;
