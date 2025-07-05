import {loginController} from '../controllers/authController.js';
import {registerController} from '../controllers/authController.js';
import {askController} from '../controllers/authController.js';
import express from 'express';

const router = express.Router();
// Route pour l'authentification de l'utilisateur

/**
 * @swagger
 * /login:
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
 * 
 * /register:
 *  post:
 *    summary: Création d'un nouvel utilisateur
 *    description: Créer un nouvel utilisateur en utilisant les données fournies. 
 *    tags: [Authentification]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              adresse_email:
 *                type: string
 *                example: "YdL0v@example.com"
 *              password:
 *                type: string
 *                example: "password123"
 *              password_confirmation:
 *                type: string
 *                example: "password123"
 *              noms:
 *                type: string
 *                example: "John"
 *              prenoms:
 *                type: string
 *                example: "Doe"
 *    responses:
 *      201:
 *        description: Utilisateur créé avec succes
 *      400:
 *        description: Tous les champs sont requis ou utilisateur existant
 *      500:
 *        description: Erreur lors de la création de l'utilisateur
 * 
 * /ask:
 *  post:
 *    summary: Demande d'accès à l'application par un utilisateur
 *    description: Permet à un utilisateur de demander l'accès à l'application en fournissant son email.
 *    tags: [Authentification]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              adresse_email:
 *                type: string
 *                example: "YdL0v@example.com"   
 *              fonction:
 *                type: string
 *                example: "Manager"    
 *              direction:
 *                type: string
 *                example: "Direction A"
 *              justificatif:
 *                type: string
 *                example: "selon l'arreté N°12 du 2023-01-01"
 *    responses:
 *      200:
 *         description: Demande d'accès envoyée avec succès
 *      400: 
 *         description: Tous les champs sont requis ou utilisateur existant  
 *      500:
 *         description: Erreur lors de l'envoi de la demande d'accès
 */

router.post('/login', loginController); // Route pour l'authentification de l'utilisateur
router.post('/register', registerController); // Route pour la création d'un nouvel utilisateur
router.post('/ask', askController); // Route pour la demande d'accès a l'application par un l'utilisateur

const AuthApiRoute = router;

export default AuthApiRoute;