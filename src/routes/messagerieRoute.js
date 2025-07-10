// src/routes/messagerieRoutes.js

import express from 'express';
import {
    createConversation,
    getUserConversations,
    getConversationDetails,
    addParticipantsToConversation,
    removeParticipantFromConversation,
    getConversationMessages,
    createMessage
} from '../controllers/messagerieController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js'; // Assurez-vous d'avoir ce middleware

const router = express.Router();

// Appliquer le middleware d'authentification à toutes les routes de chat
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   - name: Messagerie
 *     description: Gestion des conversations et des messages entre utilisateurs
 */

/**
 * @swagger
 * /api/messagerie/conversations:
 *   get:
 *     summary: Récupère la liste des conversations de l'utilisateur actuel
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id_courrier
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID du courrier pour filtrer les conversations liées
 *     responses:
 *       200:
 *         description: Liste des conversations récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation' # Référence à votre schéma Conversation
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
 */
router.get('/conversations', getUserConversations);

/**
 * @swagger
 * /api/messagerie/conversations/{idConversation}:
 *   get:
 *     summary: Récupère les détails d'une conversation spécifique, y compris les messages associés
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idConversation
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la conversation
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de la page pour la pagination des messages
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Nombre de messages par page
 *     responses:
 *       200:
 *         description: Détails de la conversation et messages récupérés
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConversationWithMessages' # Schéma incluant les messages
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas participant)
 *       404:
 *         description: Conversation non trouvée
 */
router.get('/conversations/:idConversation', getConversationDetails);

/**
 * @swagger
 * /api/messagerie/conversations:
 *   post:
 *     summary: Crée une nouvelle conversation
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_courrier:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *                 description: ID du courrier associé à la conversation (optionnel)
 *               sujet:
 *                 type: string
 *                 nullable: true
 *                 description: Sujet de la conversation (optionnel)
 *               participantIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: Liste des IDs des utilisateurs à inclure dans la conversation
 *             required:
 *               - participantIds
 *     responses:
 *       201:
 *         description: Conversation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       400:
 *         description: 'Requête invalide (ex: participants manquants)'
 *       401:
 *         description: Non autorisé
 */
router.post('/conversations', createConversation);

/**
 * @swagger
 * /api/messagerie/conversations/{idConversation}/participants:
 *   post:
 *     summary: Ajoute des utilisateurs à une conversation existante
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idConversation
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la conversation à laquelle ajouter des participants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: Liste des IDs des utilisateurs à ajouter
 *             required:
 *               - userIds
 *     responses:
 *       200:
 *         description: Participants ajoutés avec succès
 *       400:
 *         description: 'Requête invalide (ex: userIds manquant)'
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas autorisé à ajouter des participants)
 *       404:
 *         description: Conversation non trouvée
 */
router.post('/conversations/:idConversation/participants', addParticipantsToConversation);

/**
 * @swagger
 * /api/messagerie/conversations/{idConversation}/participants/{idUser}:
 *   delete:
 *     summary: Supprime un utilisateur d'une conversation
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idConversation
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la conversation
 *       - in: path
 *         name: idUser
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de l'utilisateur à supprimer de la conversation
 *     responses:
 *       200:
 *         description: Participant supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas autorisé à supprimer ce participant)
 *       404:
 *         description: Conversation ou participant non trouvé
 */
router.delete('/conversations/:idConversation/participants/:idUser', removeParticipantFromConversation);

/**
 * @swagger
 * /api/messagerie/conversations/{idConversation}/messages:
 *   get:
 *     summary: Récupère l'historique des messages d'une conversation
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idConversation
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la conversation
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de la page pour la pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Nombre de messages par page
 *     responses:
 *       200:
 *         description: Historique des messages récupéré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalMessages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message' # Référence à votre schéma Message
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas participant)
 *       404:
 *         description: Conversation non trouvée
 */
router.get('/conversations/:idConversation/messages', getConversationMessages);

/**
 * @swagger
 * /api/messagerie/messages:
 *   post:
 *     summary: Enregistre un nouveau message dans la base de données (non-temps réel)
 *     tags: [Messagerie]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_conversation
 *               - contenu
 *             properties:
 *               id_conversation:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la conversation à laquelle appartient le message
 *               contenu:
 *                 type: string
 *                 description: Contenu du message texte
 *               type_message:
 *                 type: string
 *                 enum: [texte, fichier, systeme]
 *                 default: texte
 *                 description: Type du message (texte, fichier, système)
 *               url_fichier:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: URL du fichier joint si le type est 'fichier'
 *     responses:
 *       201:
 *         description: Message créé et enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé (l'utilisateur n'est pas participant de la conversation)
 *       404:
 *         description: Conversation non trouvée
 */
router.post('/messages', createMessage);

const messagerieRoutes = router;
export default messagerieRoutes