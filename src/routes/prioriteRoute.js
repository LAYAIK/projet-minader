/**
 * @swagger
 * components:
 *   schemas:
 *     Priorite:
 *       type: object
 *       properties:
 *         id_priorite:
 *           type: string
 *           format: uuid
 *           description: L'identifiant unique de la priorité
 *         niveau:
 *           type: string
 *           description: Le niveau de priorité (ex:'Haute','Normale','Basse')
 *         description:
 *           type: string
 *           description: Une description de la priorité
 *       required:
 *         - id_priorite
 *         - niveau
 *       example:
 *         id_priorite: "123e4567-e89b-12d3-a456-426614174000"
 *         niveau: "Haute"
 *         description: "Urgent à traiter"
 */

/**
 * @swagger
 * /api/priorites:
 *   get:
 *     summary: Récupère toutes les priorités
 *     tags: [Priorités]
 *     responses:
 *       200:
 *         description: Toutes les priorités
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Priorite'
 *   post:
 *     summary: Crée une nouvelle priorité
 *     tags: [Priorités]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Priorite'
 *     responses:
 *       201:
 *         description: La priorité créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Priorite'
 *       400:
 *         description: La requête est invalide
 *
 * /api/priorites/{id}:
 *   get:
 *     summary: Récupère une priorité par son ID
 *     tags: [Priorités]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: La priorité
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Priorite'
 *       404:
 *         description: La priorité n'existe pas
 *
 *   put:
 *     summary: Met à jour une priorité
 *     tags: [Priorités]
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
 *             $ref: '#/components/schemas/Priorite'
 *     responses:
 *       200:
 *         description: La priorité mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Priorite'
 *       400:
 *         description: La requête est invalide
 *
 *   delete:
 *     summary: Supprime une priorité
 *     tags: [Priorités]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     responses:
 *       204:
 *         description: La priorité a été supprimée
 *       404:
 *         description: La priorité n'existe pas
 */
import express from 'express';
import { createPriorite, deletePriorite, getAllPriorite, getPrioriteById, updatePriorite } from '../controllers/prioriteController.js';
const router = express.Router();
router.route('/api/priorites')
    .get(getAllPriorite)
    .post(createPriorite);

router.route('/api/priorites/:id')
    .get(getPrioriteById)
    .put(updatePriorite)
    .delete(deletePriorite);

const prioriteRoutes = router;
export default prioriteRoutes
