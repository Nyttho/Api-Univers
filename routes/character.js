import { Router } from "express";
import {
  getAllCharacters,
  getOneCharacter,
  createOneCharacter,
  updateOneCharacter,
  deleteOneCharacter,
  getAllCharactersFromUniverse,
} from "../controllers/character.js";
import isAuth from "../middlewares/isAuth.js";

const characterRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Characters
 *     description: Routes concernant les personnages
 */

/**
 * @swagger
 * /api/character:
 *   get:
 *     tags:
 *       - Characters
 *     summary: Récupérer tous les personnages
 *     description: Retourne une liste de tous les personnages disponibles dans la base de données.
 *     responses:
 *       200:
 *         description: Liste des personnages renvoyée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "607f1f77bcf86cd799439011"
 *                   name:
 *                     type: string
 *                     example: "Superman"
 *                   universe:
 *                     type: string
 *                     example: "DC Comics"
 *                   description:
 *                     type: string
 *                     example: "Héros possédant une super force."
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/character/{id}:
 *   get:
 *     tags:
 *       - Characters
 *     summary: Récupérer un personnage par son ID
 *     description: Retourne les détails d'un personnage spécifique à partir de son identifiant.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du personnage à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du personnage renvoyés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "607f1f77bcf86cd799439011"
 *                 name:
 *                   type: string
 *                   example: "Superman"
 *                 universe:
 *                   type: string
 *                   example: "DC Comics"
 *                 description:
 *                   type: string
 *                   example: "Héros possédant une super force."
 *       404:
 *         description: Personnage non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/character/universe/{id}:
 *   get:
 *     tags:
 *       - Characters
 *     summary: Récupérer tous les personnages d'un univers spécifique
 *     description: Retourne la liste des personnages d'un univers donné en fonction de l'ID de l'univers.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID de l'univers pour lequel récupérer les personnages.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des personnages de l'univers renvoyée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "607f1f77bcf86cd799439011"
 *                   name:
 *                     type: string
 *                     example: "Superman"
 *                   universe:
 *                     type: string
 *                     example: "DC Comics"
 *                   description:
 *                     type: string
 *                     example: "Héros possédant une super force."
 *       404:
 *         description: Univers non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/character:
 *   post:
 *     tags:
 *       - Characters
 *     summary: Créer un nouveau personnage
 *     description: Permet de créer un personnage. Cette action nécessite une authentification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Superman"
 *               universe:
 *                 type: string
 *                 example: "DC Comics"
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Personnage créé avec succès.
 *       404:
 *         description: Univers non trouvé.
 *       401:
 *         description: Authentification requise.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/character/{id}:
 *   put:
 *     tags:
 *       - Characters
 *     summary: Mettre à jour un personnage
 *     description: Permet de mettre à jour les informations d'un personnage existant. Cette action nécessite une authentification.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du personnage à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Superman"
 *               universe:
 *                 type: string
 *                 example: "DC Comics"
 *               description:
 *                 type: string
 *                 example: "Nouveau pouvoir."
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Personnage mis à jour avec succès.
 *       400:
 *         description: Données invalides pour la mise à jour du personnage.
 *       401:
 *         description: Authentification requise.
 *       404:
 *         description: Personnage non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/character/{id}:
 *   delete:
 *     tags:
 *       - Characters
 *     summary: Supprimer un personnage
 *     description: Permet de supprimer un personnage de la base de données. Cette action nécessite une authentification.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du personnage à supprimer.
 *         schema:
 *           type: string
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Personnage supprimé avec succès.
 *       401:
 *         description: Authentification requise.
 *       404:
 *         description: Personnage non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

characterRouter.get("/", getAllCharacters);
characterRouter.get("/:id", getOneCharacter);
characterRouter.get("/universe/:id", getAllCharactersFromUniverse);
characterRouter.post("/", isAuth, createOneCharacter);
characterRouter.put("/:id", isAuth, updateOneCharacter);
characterRouter.delete("/:id", isAuth, deleteOneCharacter);

export default characterRouter;
