import { createController, deleteController, getAllController, getByIdController, searchController, updateController } from "../controllers/structureController.js";
import { Router } from "express";

/**
 * @swagger
 * tags:
 *   - name: Structures
 *     description: Gestion des structures du système
 * components:
 *   schemas:
 *     Structure:
 *       type: object
 *       properties:
 *         id_structure:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la structure
 *         nom:
 *           type: string
 *           description: Nom de la structure
 *         date_creation:
 *           type: string
 *           format: date
 *           description: Date de création de la structure
 *       required:
 *         - id_structure
 *         - nom 
 *       example:
 *         id_structure: "123e4567-e89b-12d3-a456-426614174000"
 *         nom: "Direction Générale"
 *         description: "Description de la Direction Générale"  
 *         date_creation: "2023-06-01" 
 * 
 * /api/structures:
 *   get:
 *     summary: Récupérer toutes les structures
 *     tags: [Structures]
 *     responses:
 *       200:
 *         description: Liste de toutes les structures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Structure' 
 *       500:
 *         description: Erreur lors de la recherche des structures
 *   post:
 *     summary: Crée une nouvelle structure
 *     tags: [Structures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Structure'
 *     responses:
 *       201:
 *         description: Structure crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Structure'
 *       400:
 *         description: Tous les champs sont requis
 *       500:
 *         description: Erreur lors de la création de la structure 
 * 
 * /api/structures/search:
 *   get:
 *     summary: Rechercher des structures par mot-clé
 *     tags: [Structures]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Mot-clé de recherche
 *     responses:
 *       200:
 *         description: Structures trouvées
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Structure'
 *       500:
 *         description: Erreur lors de la recherche des structures par mot-clé
 * 
 * /api/structures/{id}:
 *   get: 
 *     summary: Récupérer une structure par ID
 *     tags: [Structures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la structure
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Structure trouvéee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Structure'
 *       404:
 *         description: Structure non trouvée
 *       500:
 *         description: Erreur lors de la recherche de la structure par ID 
 *   put:
 *     summary: Mettre à jour une structure par ID
 *     tags: [Structures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la structure
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Structure'
 *     responses:
 *       200:
 *         description: Structure mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Structure'
 *       400:
 *         description: Tous les champs sont requis
 *       404:
 *         description: Structure non trouvée
 *       500:
 *         description: Erreur lors de la mise à jour de la structure par ID
 *   delete:
 *     summary: Supprimer une structure par ID
 *     tags: [Structures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la structure
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Structure supprimée avec succès
 *       404:
 *         description: Structure non trouvée
 *       500:
 *         description: Erreur lors de la suppression de la structure par ID
 */

const router = Router();

router.route('/api/structures')
    .get(getAllController)
    .post(createController);

router.route('/api/structures/search')
    .get(searchController);

router.route('/api/structures/:id')
    .get(getByIdController)
    .put(updateController)
    .delete(deleteController);

const structureRoutes = router;
export default structureRoutes