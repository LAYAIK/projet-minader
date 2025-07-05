import { createUserController, getAllUsersController,getUserByIdController,deleteUserController,updateUserController,authenticateUserController } from "../controllers/utilisateurController.js";
import express from "express";
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
 *     summary: Crée un nouveau utilisateur
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
 *               prenoms: 
 *                 type: string
 *               adresse_email:
 *                 type: string
 *               password: 
 *                 type: string
 *               password_confirmation:
 *                 type: string              
 *     responses:
 *       201:
 *         description: Rôle crée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateurs'
 *       400:
 *         description: Tous les champs sont requis
 *       500:
 *         description: Erreur lors de la création du utilisateur
 * 
 * /api/utilisateurs/{id}:
 *   get:
 *     summary: Obtenir un utilisateur par ID
 *     description: Obtenir les détails d'un utilisateur spécifique par son ID.
 *     tags: [Utilisateurs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur (UUID)
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
 *     description: Supprimer un utilisateur spécifique par son ID.
 *     tags: [Utilisateurs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur (UUID)
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
 * 
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     description: Mettre à jour les informations d'un utilisateur spécifique.
 *     tags: [Utilisateurs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur (UUID)
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
 *               noms:
 *                 type: string
 *               prenoms:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
 *       400:
 *         description: Données invalides ou email déjà utilisé.
 *       401:
 *         description: Non autorisé, token invalide ou expiré.
 *       403:
 *         description: Accès refusé, rôle insuffisant .
 *       404:
 *         description: Utilisateur non trouvé.
 *      
 * /api/utilisateurs/authenticate:
 *  post:
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
 *                 example: "YdL0v@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Utilisateur authentifié avec succès
 *       401:
 *         description: Mot de passe incorrect
 *       404:
 *         description: Utilisateur non trouvé
 *      
 */


const router = express.Router();
// Route pour créer un utilisateur
router.route('/api/utilisateurs')
    .post(createUserController)
    .get(getAllUsersController);
// Route pour obtenir un utilisateur par ID ou adresse_email
router.route('/api/utilisateurs/:id')
    .get(getUserByIdController)
    .delete(deleteUserController)
    .put(updateUserController); 
// Route pour authentifier un utilisateur
router.route('/api/utilisateurs/authenticate')  
    .post(authenticateUserController); 

// Exporter le routeur
const utilisateurRoute = router;
export default utilisateurRoute;