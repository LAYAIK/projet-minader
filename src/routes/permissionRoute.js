/**
 * @swagger
 * definitions:
 *   Permission:
 *     type: object
 *     required:
 *       - id_permission
 *       - nom
 *     properties:
 *       id_permission:
 *         type: string
 *         format: uuid
 *         description: Identifiant unique de la permission
 *       nom:
 *         type: string
 *         description: Nom de la permission
 *       description: 
 *         type: string
 *         description: Décrit une permission
 *     example:
 *       id_permission: "123e4567-e89b-12d3-a456-426614174000"
 *       nom: "document.lire"
 *       description: "Permet de lire un document"
 */
/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Récupère la liste de toutes les permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: La liste de toutes les permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Permission'
 *   post:
 *     summary: Crée une nouvelle permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Permission'
 *     responses:
 *       201:
 *         description: La permission a été crée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Permission'
 *       400:
 *         description: La permission existe déjà
 */
/**
 * @swagger
 * /api/permissions/{id}:
 *   get:
 *     summary: Récupère une permission par son ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: L'ID de la permission
 *     responses:
 *       200:
 *         description: La permission correspondante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Permission'
 *       404:
 *         description: La permission n'existe pas
 */
/**
 * @swagger
 * /api/permissions/{id}:
 *   put:
 *     summary: Modifie une permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: L'ID de la permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Permission'
 *     responses:
 *       200:
 *         description: La permission a été modifiée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Permission'
 *       400:
 *         description: La permission existe déjà
 */
/**
 * @swagger
 * /api/permissions/{id}:
 *   delete:
 *     summary: Supprime une permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: L'ID de la permission
 *     responses:
 *       204:
 *         description: La permission a été supprimée
 *       404:
 *         description: La permission n'existe pas aussi 
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas autorisé à supprimer cette permission)
 */

import express from 'express';
import { getAllPermissionsController, createPermissionController, getPermissionByIdController, 
    updatePermissionController, deletePermissionController } from '../controllers/permissionController.js';

const router = express.Router();

router.route('/api/permissions')
    .get(getAllPermissionsController)
    .post(createPermissionController);

router.route('/api/permissions/:id')
    .get(getPermissionByIdController)
    .put(updatePermissionController)
    .delete(deletePermissionController);

const permissionRoutes = router;
export default permissionRoutes;

