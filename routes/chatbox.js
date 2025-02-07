import { Router } from "express";
import {
  getAllConversations,
  getOneConversation,
  createConversation,
  deleteConversation,
} from "../controllers/chatbox.js";
import isAuth from "../middlewares/isAuth.js";

const conversationRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Conversations
 *     description: Routes des conversations
 */

/**
 * @swagger
 * /api/conversation/{id}:
 *   get:
 *     tags:
 *       - Conversations
 *     summary: Récupérer une conversation par son ID
 *     description: Permet de récupérer une conversation spécifique à partir de son identifiant.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la conversation à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conversation récupérée avec succès.
 *       404:
 *         description: Conversation non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/conversation/character/{id}:
 *   post:
 *     tags:
 *       - Conversations
 *     summary: Créer une nouvelle conversation avec un personnage
 *     description: Crée une conversation en liant un personnage à cette conversation.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du personnage avec lequel créer la conversation.
 *         schema:
 *           type: string
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Conversation créée avec succès.
 *       400:
 *         description: Mauvaise demande - Pas de données dans le body.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/conversation/{id}:
 *   delete:
 *     tags:
 *       - Conversations
 *     summary: Supprimer une conversation
 *     description: Supprime une conversation existante en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la conversation à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conversation supprimée avec succès.
 *       404:
 *         description: Conversation non trouvée.
 *       500:
 *         description: Erreur interne du serveur.
 */
conversationRouter.get("/conversation/:id", isAuth, getAllConversations);
conversationRouter.get("/:id", isAuth, getOneConversation);
conversationRouter.post("/character/:id", isAuth, createConversation);
conversationRouter.delete("/:id", isAuth, deleteConversation);

export default conversationRouter;
