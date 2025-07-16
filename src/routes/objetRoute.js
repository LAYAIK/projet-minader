/**
 * @swagger
 * definitions:
 *   Objet:
 *     type: object
 *     required:
 *       - id_objet
 *       - libelle
 *       - description
 *     properties:
 *       id_objet:
 *         type: string
 *         format: uuid
 *       libelle:
 *         type: string
 *       description:
 *         type: string
 *     example:
 *       id_objet: "123e4567-e89b-12d3-a456-426655440000"
 *       libelle: "Demande"
 *       description: "Description de l'objet 1"
 */

/**
 * @swagger
 * /api/objets:
 *   get:
 *     summary: Renvoie la liste des objets
 *     tags: [Objets]
 *     responses:
 *       200:
 *         description: Liste des objets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Objet'
 *       500:
 *         description: Erreur interne
 *   post:
 *     summary: Cr e un objet
 *     tags: [Objets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Objet'
 *     responses:
 *       201:
 *         description: Objet cr e
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Objet'
 *       400:
 *         description: Erreur dans la requ te
 *       500:
 *         description: Erreur interne
 *
 * /api/objets/{id}:
 *   get:
 *     summary: Renvoie un objet par son ID
 *     tags: [Objets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Objet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Objet'
 *       404:
 *         description: Objet non trouv
 *       500:
 *         description: Erreur interne
 *   put:
 *     summary: Met   jour un objet
 *     tags: [Objets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Objet'
 *     responses:
 *       200:
 *         description: Objet mis   jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Objet'
 *       400:
 *         description: Erreur dans la requ te
 *       404:
 *         description: Objet non trouv
 *       500:
 *         description: Erreur interne
 *   delete:
 *     summary: Supprime un objet
 *     tags: [Objets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: Objet supprim
 *       404:
 *         description: Objet non trouv
 *       500:
 *         description: Erreur interne du serveur de l'API
 */

import express from 'express';
import { createObjetController, deleteObjetController, getAllObjetsController, getObjetByIdController, updateObjetController } from '../controllers/objetController.js';
const router = express.Router();

router.route('/api/objets')
    .get(getAllObjetsController)
    .post(createObjetController);

router.route('/api/objets/:id')
    .get(getObjetByIdController)
    .put(updateObjetController)
    .delete(deleteObjetController);

const objetRoutes = router;
export default objetRoutes;
