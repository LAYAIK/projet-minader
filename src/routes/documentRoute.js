/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Crée un document
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Libellé du document
 *                 example: "Document Example"
 *               description:
 *                 type: string
 *                 description: Description du document
 *                 example: "Description du document"
 *               id_courrier:
 *                 type: string
 *                 format: uuid
 *                 description: ID du courrier lié au document
 *                 example: '123e4567-e89b-12d3-a456-426614174000'
 *               id_type_document:
 *                 type: string
 *                 format: uuid
 *                 description: ID du type de document
 *                 example: '123e4567-e89b-12d3-a456-426614174000'
 *               id_archive:
 *                 type: string
 *                 format: uuid
 *                 description: ID de l'archive lié au document
 *                 example: '123e4567-e89b-12d3-a456-426614174000'
 *     responses:
 *       201:
 *         description: Document créé
 *       400:
 *         description: Erreur lors de la création du document
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Récupère la liste des documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: Liste des documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       401:
 *         description: Non autorisé
 */

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Récupère un document par son ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du document
 *     responses:
 *       200:
 *         description: Document trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Document non trouvé
 */

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     summary: Met à jour un document
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Libellé du document
 *                 example: "Document Example"
 *               description:
 *                 type: string
 *                 description: Description du document
 *                 example: "Description du document"
 *               id_courrier:
 *                 type: string
 *                 format: uuid
 *                 description: ID du courrier lié au document
 *                 example: '123e4567-e89b-12d3-a456-426614174000'
 *               id_type_document:
 *                 type: string
 *                 format: uuid
 *                 description: ID du type de document
 *                 example: '123e4567-e89b-12d3-a456-426614174000'
 *               id_archive:
 *                 type: string
 *                 format: uuid
 *                 description: ID de l'archive lié au document
 *                 example: '123e4567-e89b-12d3-a456-426614174000'
 *     responses:
 *       200:
 *         description: Document mis à jour
 *       400:
 *         description: Erreur lors de la mise à jour du document
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Document non trouvé
 */

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Supprime un document
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID du document
 *     responses:
 *       204:
 *         description: Document supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Document non trouvé
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       properties:
 *         id_document:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du document
 *         libelle:
 *           type: string
 *           description: Libellé du document
 *         description:
 *           type: string
 *           description: Description du document
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création du document
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour du document
 *       required:
 *         - id_document
 *         - libelle
 *       example:
 *         id_document: "123e4567-e89b-12d3-a456-426614174000"
 *         libelle: "Document Example"
 *         description: "Description de l'exemple de document"
 *         createdAt: "2023-10-01T12:00:00Z"
 *         updatedAt: "2023-10-01T12:00:00Z"
 */

/**
 * @swagger
 * /api/documents/search:
 *   get:
 *     summary: Rechercher des documents par mot-clé
 *     tags: [Documents]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Mot-clé de recherche
 *     responses:
 *       200:
 *         description: Documents trouvés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Aucun document trouvé
 */

import express from 'express';
import {
    getAllDocumentsController,
    createDocumentController,
    getDocumentByIdController,
    updateDocumentController,
    deleteDocumentController,
    searchDocumentsController

} from '../controllers/documentController.js';
//import { authenticateToken, authorize } from '../middlewares/authMiddleware.js';
//import { authorizeWithScopes } from '../middlewares/authorizeWithScopes.js';

// const router = express.Router();

// router.route('/api/documents')
//     .get(authenticateToken, authorize, authorizeWithScopes('document.lire'), getAllDocumentsController)
//     .post(authenticateToken, authorizeWithScopes('document.creer'), createDocumentController);

// router.route('/api/documents/:id')
//     .get(authenticateToken, authorizeWithScopes('document.lire'), getDocumentByIdController)
//     .put(authenticateToken, authorizeWithScopes('document.modifier'), updateDocumentController)
//     .delete(authenticateToken, authorizeWithScopes('document.supprimer'), deleteDocumentController);

// router.route('/api/documents/search')
//     .get(authenticateToken, authorizeWithScopes('document.lire'), searchDocumentsController);


const router = express.Router();

router.route('/api/documents')
    .get( getAllDocumentsController)
    .post(createDocumentController);

router.route('/api/documents/search')
    .get( searchDocumentsController);


router.route('/api/documents/:id')
    .get(getDocumentByIdController)
    .put(updateDocumentController)
    .delete(deleteDocumentController);



const documentRoutes = router;
export default documentRoutes;
