import { Router } from "express";
import {
  getAllUniverses,
  getOneUniverse,
  createOneUniverse,
  updateOneUniverse,
  deleteOneUniverse,
} from "../controllers/universe.js";

import isAuth from "../middlewares/isAuth.js";

const universeRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Universes
 *     description: Routes des univers
 */

/**
 * @swagger
 * /api/universe:
 *   get:
 *     tags:
 *       - Universes
 *     summary: Récupérer tous les univers
 *     description: Permet de récupérer tous les univers existants.
 *     responses:
 *       200:
 *         description: Univers récupérés avec succès.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/universe/{id}:
 *   get:
 *     tags:
 *       - Universes
 *     summary: Récupérer un univers spécifique
 *     description: Permet de récupérer un univers spécifique en fonction de son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'univers à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Univers trouvé avec succès.
 *       404:
 *         description: Univers non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/universe:
 *   post:
 *     tags:
 *       - Universes
 *     summary: Créer un nouvel univers
 *     description: Permet de créer un nouvel univers. L'authentification est requise pour cette action.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mon Univers"
 *               description:
 *                 type: string
 *                 example: "Description de mon univers."
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Univers créé avec succès.
 *       400:
 *         description: Mauvaise demande - Le corps de la requête est incorrect.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/universe/{id}:
 *   put:
 *     tags:
 *       - Universes
 *     summary: Mettre à jour un univers spécifique
 *     description: Permet de mettre à jour un univers spécifique en fonction de son ID. L'authentification est requise pour cette action.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'univers à mettre à jour.
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
 *                 example: "Univers modifié"
 *               description:
 *                 type: string
 *                 example: "Description mise à jour."
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Univers mis à jour avec succès.
 *       404:
 *         description: Univers non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

/**
 * @swagger
 * /api/universe/{id}:
 *   delete:
 *     tags:
 *       - Universes
 *     summary: Supprimer un univers spécifique
 *     description: Permet de supprimer un univers spécifique en fonction de son ID. L'authentification est requise pour cette action.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'univers à supprimer.
 *         schema:
 *           type: string
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Univers supprimé avec succès.
 *       404:
 *         description: Univers non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */

universeRouter.get("/", getAllUniverses);
universeRouter.get("/:id", getOneUniverse);
universeRouter.post("/", isAuth, createOneUniverse);
universeRouter.put("/:id", isAuth, updateOneUniverse);
universeRouter.delete("/:id", isAuth, deleteOneUniverse);

export default universeRouter;
