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
 *         Permissions:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - id_role
 *         - nom
 *       example:
 *         id_role: "123e4567-e89b-12d3-a456-426614174000"
 *         nom: "Administrateur"
 *         description: "Role d'administration"
 *         Permissions: ["read", "write", "delete"]
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
 */


const router = express.Router();

router.post("/api/roles", createRole);
router.get("/api/roles", getAllRoles);
router.get("/:id", getRoleById);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole)

const roleRoutes = router;
export default roleRoutes