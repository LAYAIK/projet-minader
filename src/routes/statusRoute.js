/**
 * @swagger
 * components:
 *   schemas:
 *     Status:
 *       type: object
 *       required:
 *         - id_status
 *         - libelle
 *       properties:
 *         id_status:
 *           type: string
 *           format: uuid
 *           description: ID du statut
 *         libelle:
 *           type: string
 *           description: Libellé du statut
 *         description:
 *           type: string
 *           description: Description du statut
 *       example:
 *         id: '123e4567-e89b-12d3-a456-426614174000'
 *         libelle: Actif
 *         description: Statut actif
 */

/**
 * @swagger
 * /api/statuses:
 *   get:
 *     summary: Renvoie la liste des statuts
 *     tags: [Statuts]
 *     responses:
 *       200:
 *         description: La liste des statuts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Status'
 *   post:
 *     summary: Crée un statut
 *     tags: [Statuts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Status'
 *     responses:
 *       201:
 *         description: Le statut créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *
 * /api/statuses/{id}:
 *   get:
 *     summary: Renvoie un statut par son ID
 *     tags: [Statuts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du statut
 *     responses:
 *       200:
 *         description: Le statut
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *       404:
 *         description: Le statut n'existe pas
 *   put:
 *     summary: Met à jour un statut
 *     tags: [Statuts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du statut
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Status'
 *     responses:
 *       200:
 *         description: Le statut mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *   delete:
 *     summary: Supprime un statut
 *     tags: [Statuts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du statut
 *     responses:
 *       204:
 *         description: Le statut a été supprimé avec succès
 *       404:
 *         description: Le statut n'existe pas
 */

import express from 'express';
import {
    getAllStatusesController,
    createStatusController,
    updateStatusController,
    deleteStatusController,
    getStatusByIdController
} from '../controllers/statusController.js';

const router = express.Router();

router.route('/api/statuses')
    .get(getAllStatusesController)
    .post(createStatusController);

router.route('/api/statuses/:id')
    .get(getStatusByIdController)
    .put(updateStatusController)
    .delete(deleteStatusController);

const statusRoutes = router;
export default statusRoutes
