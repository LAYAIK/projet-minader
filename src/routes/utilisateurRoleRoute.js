/**
 * @swagger
 * components:
 *   schemas:
 *     UtilisateurRole:
 *       type: object
 *       properties:
 *         id_utilisateur_role:
 *           type: string
 *           format: uuid
 *           description: ID unique de l'association utilisateur-rôle
 *         id_utilisateur:
 *           type: string
 *           format: uuid
 *           description: ID de l'utilisateur
 *         id_role:
 *           type: string
 *           format: uuid
 *           description: ID du rôle
 *         date_attribution:
 *           type: string
 *           format: date-time
 *           description: Date d'attribution du rôle à l'utilisateur
 *         date_suppression:
 *           type: string
 *           format: date-time
 *           description: Date de suppression du rôle de l'utilisateur
 *         date_modification:
 *           type: string
 *           format: date-time
 *           description: Date de modification du rôle de l'utilisateur
 *       required:
 *         - id_utilisateur_role
 *         - id_utilisateur
 *         - id_role
 *       example:
 *         id_utilisateur_role: "123e4567-e89b-12d3-a456-426614174001"
 *         id_utilisateur: "123e4567-e89b-12d3-a456-426614174002"
 *         id_role: "123e4567-e89b-12d3-a456-426614174003"
 *         date_attribution: "2023-01-01T00:00:00.000Z" 
 *         date_suppression: "2023-01-01T00:00:00.000Z"
 *         date_modification: "2023-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * /api/utilisateurs-roles:
 *   get:
 *     summary: Récupère la liste de toutes les associations utilisateur-rôle
 *     tags: [Utilisateurs-Rôles]
 *     responses:
 *       200:
 *         description: La liste des associations utilisateur-rôle
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UtilisateurRole'
 *   post:
 *     summary: Crée une nouvelle association utilisateur-rôle
 *     tags: [Utilisateurs-Rôles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UtilisateurRole'
 *     responses:
 *       201:
 *         description: L'association utilisateur-rôle a été créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UtilisateurRole'
 *       400:
 *         description: La requête est invalide
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       409:
 *         description: L'association utilisateur-rôle existe déjà
 *
 * /api/utilisateurs-roles/{id}:
 *   get:
 *     summary: Récupère l'association utilisateur-rôle par son ID
 *     tags: [Utilisateurs-Rôles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: L'ID de l'association utilisateur-rôle
 *     responses:
 *       200:
 *         description: L'association utilisateur-rôle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UtilisateurRole'
 *       404:
 *         description: L'association utilisateur-rôle n'existe pas
 *
 *   put:
 *     summary: Met à jour l'association utilisateur-rôle
 *     tags: [Utilisateurs-Rôles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: L'ID de l'association utilisateur-rôle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UtilisateurRole'
 *     responses:
 *       200:
 *         description: L'association utilisateur-rôle a été mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UtilisateurRole'
 *       400:
 *         description: La requête est invalide
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: L'association utilisateur-rôle n'existe pas
 *
 *   delete:
 *     summary: Supprime l'association utilisateur-rôle
 *     tags: [Utilisateurs-Rôles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: L'ID de l'association utilisateur-rôle
 *     responses:
 *       204:
 *         description: L'association utilisateur-rôle a été supprimée
 *       404:
 *         description: L'association utilisateur-rôle n'existe pas
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas autorisé à supprimer cette association utilisateur-rôle)
 */

import express from 'express';
import { getAllUtilisateurRoleController, createUtilisateurRoleController, getUtilisateurRoleByIdController, 
    updateUtilisateurRoleController, deleteUtilisateurRoleController } from '../controllers/utilisateurRoleController.js';

const router = express.Router();

router.route('/api/utilisateurs-roles')
    .get(getAllUtilisateurRoleController)
    .post(createUtilisateurRoleController);

router.route('/api/utilisateurs-roles/:id')
    .get(getUtilisateurRoleByIdController)
    .put(updateUtilisateurRoleController)
    .delete(deleteUtilisateurRoleController);

const utilisateurRoleRoutes = router;
export default utilisateurRoleRoutes
