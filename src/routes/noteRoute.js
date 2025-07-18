/**
 * @swagger
 * definitions:
 *   Note:
 *     type: object
 *     required:
 *       - id_note
 *       - note
 *     properties:
 *       id_note:
 *         type: string
 *         format: uuid
 *       note:
 *         type: string
 *       id_courrier:
 *         type: string
 *     example:
 *       id_note: "123e4567-e89b-12d3-a456-426614174000"
 *       note: "Note de test"
 *       id_courrier: "123e4567-e89b-12d3-a456-426614174000"
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Récupère toutes les notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Liste de toutes les notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Note'
 *       500:
 *         description: Erreur lors de la récupération des notes
 *   post:
 *     summary: Crée une nouvelle note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Note'
 *     responses:
 *       201:
 *         description: Note créée
 *       400:
 *         description: Erreur lors de la création de la note
 * 
 * /api/notes/{id}:
 *   get:
 *     summary: Récupère une note par son ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la note
 *     responses:
 *       200:
 *         description: Note trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Note'
 *       404:
 *         description: Note non trouvée
 *   put:
 *     summary: Met à jour une note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Note'
 *     responses:
 *       200:
 *         description: Note mise à jour
 *       400:
 *         description: Erreur lors de la mise à jour de la note
 *   delete:
 *     summary: Supprime une note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la note
 *     responses:
 *       204:
 *         description: Note supprimée avec succès
 *       400:
 *         description: Erreur lors de la suppression de la note
 */

import express from 'express';
import { 
    getAllNotesController, 
    createNoteController, 
    getNoteByIdController, 
    updateNoteController, 
    deleteNoteController 
} from '../controllers/noteController.js';

const router = express.Router();

router.route('/api/notes')
    .get(getAllNotesController)
    .post(createNoteController);

router.route('/api/notes/:id')
    .get(getNoteByIdController)
    .put(updateNoteController)
    .delete(deleteNoteController);

const noteRoutes = router;
export default noteRoutes
