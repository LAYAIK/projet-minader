
/**
 * @swagger
 * components:
 *   schemas:
 *     Transition:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la transition
 *         date_transition:
 *           type: string
 *           format: date-time
 *           description: Date de la transition
 *         description:
 *           type: string
 *           description: Description de la transition
 *         id_status:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du statut
 *         id_courrier:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du courrier
 *         id_priorite:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la priorité
 *         id_objet:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de l'objet
 *         id_role:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du rôle
 *         id_document:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du document
 *         id_note:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la note
 *         id_structure_expediteur:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la structure expéditeure
 *         id_structure_destinataire:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la structure destinataire
 *       required:
 *         - id
 *         - date_transition
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         date_transition: "2023-10-01T12:00:00Z"
 *         description: "Transition description example"
 *         id_status: "123e4567-e89b-12d3-a456-426614174001"
 *         id_courrier: "123e4567-e89b-12d3-a456-426614174002"
 *         id_priorite: "123e4567-e89b-12d3-a456-426614174003"
 *         id_objet: "123e4567-e89b-12d3-a456-426614174004"
 *         id_role: "123e4567-e89b-12d3-a456-426614174005"
 *         id_document: "123e4567-e89b-12d3-a456-426614174006"
 *         id_note: "123e4567-e89b-12d3-a456-426614174007"
 *         id_structure_expediteur: "123e4567-e89b-12d3-a456-426614174008"
 *         id_structure_destinataire: "123e4567-e89b-12d3-a456-426614174009"
 */

/**
 * @swagger
 * /api/transitions:
 *   get:
 *     summary: Retourne la liste de toutes les transitions
 *     tags: [Transitions]
 *     responses:
 *       200:
 *         description: La liste de toutes les transitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transition'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Aucune transition trouvée
 */

/**
 * @swagger
 * /api/transitions/{id}:
 *   get:
 *     summary: Retourne une transition par son ID
 *     tags: [Transitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la transition
 *     responses:
 *       200:
 *         description: La transition demandée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transition'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Transition non trouvée
 */

/**
 * @swagger
 * /api/transitions:
 *   post:
 *     summary: Crée une transition
 *     tags: [Transitions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transition'
 *     responses:
 *       201:
 *         description: La transition créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transition'
 *       400:
 *         description: Erreur lors de la création de la transition
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/transitions/{id}:
 *   put:
 *     summary: Met à jour une transition
 *     tags: [Transitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la transition
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transition'
 *     responses:
 *       200:
 *         description: La transition mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transition'
 *       400:
 *         description: Erreur lors de la mise à jour de la transition
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/transitions/{id}:
 *   delete:
 *     summary: Supprime une transition
 *     tags: [Transitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la transition
 *     responses:
 *       204:
 *         description: La transition supprimée
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Transition non trouvée ou non supprimée
 */

import express from 'express';
import { getAllTransitions, createTransition, getTransitionById, updateTransition, deleteTransition } from '../controllers/transiterController.js';

const router = express.Router();
router.route('/api/transitions')
    .get(getAllTransitions)
    .post(createTransition);

router.route('/api/transitions/:id')
    .get(getTransitionById)
    .put(updateTransition)
    .delete(deleteTransition);

const transiterRoutes = router;
export default transiterRoutes
