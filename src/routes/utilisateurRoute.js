import { createUserController, getAllUsersController,getUserByIdController,deleteUserController,updateUserController,authenticateUserController,searchUserController } from "../controllers/utilisateurController.js";
import express from "express";

/**
 * @swagger
 * components:
 *   schemas:
 *     Utilisateur:
 *       type: object
 *       properties:
 *         id_utilisateur:
 *           type: string
 *           format: uuid
 *           example: 12345678-1234-1234-1234-123456789012
 *         noms:
 *           type: string
 *           example: John Doe
 *         prenoms:
 *           type: string
 *           example: John
 *         fonction:
 *           type: string
 *           example: developpeur
 *         direction:
 *           type: string
 *           example: developpement
 *         adresse_email:
 *           type: string
 *           format: email
 *           example: John.Doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: motDePasse123
 *         password_confirmation:
 *           type: string
 *           format: password
 *           example: motDePasse123
 *         id_role:
 *           type: string
 *           format: uuid
 *           example: 12345678-1234-1234-1234-123456789012
 *         id_structure:
 *           type: string
 *           format: uuid
 *           example: 12345678-1234-1234-1234-123456789012
 *         is_actif:
 *           type: boolean
 *           example: true
 *         justificatif:
 *           type: string
 *           example: justificatif.pdf
 *       required:
 *         - noms
 *         - adresse_email
 *         - password
 *         - password_confirmation
 */

/**
 * @swagger 
 * 
 * /api/utilisateurs:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Utilisateurs]
 *     responses:
 *       200:
 *         description: Récupérer tous les utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Utilisateurs'
 *       401:
 *         description: Non autorisé, token invalide ou expiré.
 *       403:
 *         description: Accès refusé, rôle insuffisant. 
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noms:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *                 example: "NONO"
 *               prenoms: 
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *                 example: "Nono"
 *               adresse_email:
 *                 type: string
 *                 description: Adresse email de l'utilisateur
 *                 example: "n5z8o@example.com"
 *               password: 
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *                 example: "password123"
 *               password_confirmation:
 *                 type: string 
 *                 description: Confirmation du mot de passe de l'utilisateur
 *                 example: "password123"
 *               id_role:
 *                 type: string
 *                 description: ID du rôle de l'utilisateur (UUID)
 *                 example: "123e4567-e89b-12d3-a456-426655440000"
 *               fonction:
 *                 type: string
 *                 description: Fonction de l'utilisateur
 *                 example: "Directeur"
 *               direction:
 *                 type: string
 *                 description: Informations supplémentaires sur l'utilisateur
 *                 example: "Direction Générale"
 *               justificatif:
 *                 type: string  
 *                 description: Justificatif de l'utilisateur
 *                 example: "justificatif.pdf"
 *               id_structure:
 *                 type: string
 *                 description: ID de la structure de l'utilisateur (UUID)
 *                 example: "123e4567-e89b-12d3-a456-426655440000"
 *               is_actif:
 *                 type: boolean
 *                 description: Indique si l'utilisateur est actif
 *                 example: true
 *     responses:
 *       201:
 *         description: Utilisateur crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateurs'
 *       400:
 *         description: Tous les champs sont requis
 *       500:
 *         description: Erreur lors de la création de l'utilisateur
 * 
 * /api/utilisateurs/{id}:
 *   get:
 *     summary: Obtenir un utilisateur spécifique
 *     description: Obtenir les détails d'un utilisateur par ID ou adresse email
 *     tags: [Utilisateurs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur ou adresse email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur obtenu avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
 *       401:
 *         description: Non autorisé, token invalide ou expiré.
 *       403:
 *         description: Accès refusé, rôle insuffisant.
 *       404:
 *         description: Utilisateur non trouvé.
 * 
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprimer un utilisateur
 *     tags: [Utilisateurs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur à supprimer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       401:
 *         description: Non autorisé, token invalide ou expiré.
 *       403:
 *         description: Accès refusé, rôle insuffisant (non-administrateur).
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur lors de la suppression de l'utilisateur
 * 
 * 
 *   put:
 *     summary: Met à jour d'un utilisateur
 *     description: Met à jour les informations d'un utilisateur
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           description: ID numérique ou adresse email de l'utilisateur à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noms:
 *                 type: string
 *                 description: Nom(s) de l'utilisateur
 *                 example: "Nono"
 *               password:
 *                 type: string
 *                 description: Nouveau mot de passe de l'utilisateur
 *                 example: "nouveauPassword123"
 *               prenoms:
 *                 type: string
 *                 description: Prénom(s) de l'utilisateur
 *                 example: "Michel"
 *               fonction:
 *                 type: string
 *                 description: Fonction de l'utilisateur
 *                 example: "Directeur"
 *               direction:
 *                 type: string
 *                 description: Direction de l'utilisateur
 *                 example: "Direction Générale"
 *               justificatif:
 *                 type: string
 *                 description: Justificatif de l'utilisateur
 *                 example: "justificatif.pdf"
 *               id_role:
 *                 type: string
 *                 format: uuid
 *                 description: ID du rôle de l'utilisateur
 *                 example: "213e4567-e89b-12d3-a456-426614174003"
 *               id_structure:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la structure de l'utilisateur
 *                 example: "23e4567-e89b-12d3-a456-426614174002"
 *               is_actif:
 *                 type: boolean
 *                 description: Indique si l'utilisateur est actif
 *                 example: true
 *               adresse_email:
 *                 type: string
 *                 format: string
 *                 description: Adresse email de l'utilisateur
 *                 example: "n5z8o@example.com"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
 *       400:
 *         description: Requête invalide (ID ou adresse_email manquant)
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 *      
 * /api/utilisateurs/authenticate:
 *   post:
 *     summary: Authentification de l'utilisateur
 *     description: Authentifie un utilisateur en utilisant son email et son mot de passe.
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adresse_email:
 *                 type: string
 *                 format: email
 *                 example: "YdL0v@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Utilisateur authentifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
 *       404:
 *         description: Utilisateur non trouvé
 *
 * /api/utilisateurs/search:
 *   get:
 *     summary: Recherche d'utilisateurs
 *     description: Recherche des utilisateurs par mot-clé (noms, email, id, fonction, direction, prenoms)
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Mot-clé à rechercher parmi les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs trouvés ou message indiquant qu'aucun utilisateur n'a été trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Utilisateur'
 *                 message:
 *                   type: string
 *       400:
 *         description: La requête de recherche est requise
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur lors de la recherche de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 system_message:
 *                   type: string
 */


const router = express.Router();
// Route pour créer un utilisateur
router.route('/api/utilisateurs')
    .post(createUserController)
    .get(getAllUsersController);
router.route('/api/utilisateurs/search')
    .get(searchUserController);
router.route('/api/utilisateurs/:id')
    .get(getUserByIdController)
    .delete(deleteUserController)
    .put(updateUserController); 
router.route('/api/utilisateurs/authenticate')  
    .post(authenticateUserController); 
// Exporter le routeur
const utilisateurRoutes = router;
export default utilisateurRoutes;