/**
 * @swagger
 * components:
 *   schemas:
 *     RolePermission:
 *       type: object
 *       properties:
 *         id_role_permission:
 *           type: string
 *           format: uuid
 *           description: ID unique de l'association rôle-permission
 *         id_role:
 *           type: string
 *           format: uuid
 *           description: ID du rôle
 *         id_permission:
 *           type: string
 *           format: uuid
 *           description: ID de la permission
 *         date_attribution:
 *           type: string
 *           format: date-time
 *           description: Date d'attribution de la permission au rôle
 *         date_suppression:
 *           type: string
 *           format: date-time
 *           description: Date de suppression de la permission du rôle
 *         date_modification:
 *           type: string
 *           format: date-time
 *           description: Date de modification de l'association rôle-permission
 *       required:
 *         - id
 *         - id_role
 *         - id_permission
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         id_role: "123e4567-e89b-12d3-a456-426614174001"
 *         id_permission: "123e4567-e89b-12d3-a456-426614174002"
 *         date_attribution: "2023-01-01T00:00:00.000Z"
 *         date_suppression: "2023-01-01T00:00:00.000Z"
 *         date_modification: "2023-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * /api/role-permissions:
 *   get:
 *     summary: Récupère toutes les associations rôle-permission
 *     tags: [Role-Permissions]
 *     responses:
 *       200:
 *         description: Toutes les associations rôle-permission
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RolePermission'
 *   post:
 *     summary: Crée une nouvelle association rôle-permission
 *     tags: [Role-Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RolePermission'
 *     responses:
 *       201:
 *         description: La nouvelle association rôle-permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RolePermission'
 *       404:
 *         description: L'association rôle-permission n'existe pas ou n'a pas pu étre crée
 * 
 * /api/role-permissions/{id}:
 *   put:
 *     summary: Met à jour une association rôle-permission
 *     tags: [Role-Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: L'ID de l'association rôle-permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RolePermission'
 *     responses:
 *       200:
 *         description: L'association rôle-permission a été mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RolePermission'
 *   delete:
 *     summary: Supprime une association rôle-permission
 *     tags: [Role-Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: L'ID de l'association rôle-permission
 *     responses:
 *       204:
 *         description: L'association rôle-permission a été supprimée avec succès
 *       404:
 *         description: L'association rôle-permission n'existe pas
 * 
 *   get:
 *     summary: Récupère une association rôle-permission par son ID
 *     tags: [Role-Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: L'ID de l'association rôle-permission
 *     responses:
 *       200:
 *         description: L'association rôle-permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RolePermission'
 *       404: 
 *         description: L'association rôle-permission n'existe pas ou n'a pas pu étre trouvée
 * 
 */

import express from 'express';
import { getAllRolePermissionsController, createRolePermissionController, getRolePermissionByIdController, updateRolePermissionController, deleteRolePermissionController } from '../controllers/rolePermissionController.js';

const router = express.Router();

router.route('/api/role-permissions')
    .get(getAllRolePermissionsController)
    .post(createRolePermissionController);

router.route('/api/role-permissions/:id')
    .get(getRolePermissionByIdController)
    .put(updateRolePermissionController)
    .delete(deleteRolePermissionController);

const rolePermissionRoutes = router;
export default rolePermissionRoutes;

