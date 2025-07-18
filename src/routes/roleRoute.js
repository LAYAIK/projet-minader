import { createRole, deleteRole, getAllRoles, getRoleById, updateRole } from "../controllers/roleController.js";

import express from "express";

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Gestion des rôles et permissions du système
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id_role:
 *           type: string
 *           format: uuid
 *         nom:
 *           type: string
 *         description:
 *           type: string
 *       required:
 *         - id_role
 *         - nom
 *       example:
 *         id_role: "123e4567-e89b-12d3-a456-426614174000"
 *         nom: "Administrateur"
 *         description: "Role d'administration"
 * /api/roles:
 *   get:
 *     summary: Récupérer tous les rôles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Récupérer tous les rôles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *   post:
 *     summary: Crée un nouveau rôle
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               Permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Rôle crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Tous les champs sont requis
 *       500:
 *         description: Erreur lors de la création du rôle
 *
 * /api/roles/{id}:
 *   get:
 *     summary: Récupère un rôle par son ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du rôle
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rôle obtenu avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rôle non trouvé
 *   put:
 *     summary: Mettre à jour un rôle
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du rôle
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rôle mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Tous les champs sont requis
 *       404:
 *         description: Rôle non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour du rôle
 *   delete:
 *     summary: Supprime un rôle
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du rôle
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rôle supprimé avec succès
 *       404:
 *         description: Rôle non trouvé
 *       500:
 *         description: Erreur lors de la suppression du rôle
 * 
 */


const router = express.Router();

router.route('/api/roles')
    .get(getAllRoles)
    .post(createRole);

router.route('/api/roles/:id')
    .get(getRoleById)
    .put(updateRole)
    .delete(deleteRole);

const roleRoutes = router;
export default roleRoutes