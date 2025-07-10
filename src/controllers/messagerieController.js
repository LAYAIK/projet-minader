// src/controllers/chatController.js
import db from '../models/index.js'; // Importe l'objet 'db' qui contient tous les modèles
const { Conversation, ConversationParticipant, Utilisateur, Message, Courrier } = db; // Déstructure les modèles de l'objet 'db'
import { Op } from 'sequelize';

// Middleware d'authentification (à implémenter)
// const authenticateToken = (req, res, next) => {
//     // Implémentez la logique de vérification du JWT ici
//     // Si l'utilisateur est authentifié, attachez l'objet utilisateur à req.user
//     // Ex: req.user = { id_utilisateur: 'uuid-de-l-utilisateur', nom_utilisateur: 'John Doe' };
//     // Sinon, renvoyez un 401 Unauthorized
//     next(); // À retirer une fois l'authentification implémentée
// };


// GET /api/conversations
// Récupère la liste des conversations de l'utilisateur actuel
export const getUserConversations = async (req, res, next) => {
    try {
        const currentUserId = req.user.id_utilisateur; // ID de l'utilisateur connecté via JWT
        const { id_courrier } = req.query; // Filtre optionnel

        let whereConditions = {};
        if (id_courrier) {
            whereConditions.id_courrier = id_courrier;
        }

        const conversations = await Conversation.findAll({
            where: whereConditions,
            include: [
                {
                    model: Utilisateur,
                    as: 'members', // Alias pour les participants de la conversation
                    where: { id_utilisateur: currentUserId }, // Assurez-vous que l'utilisateur est un participant
                    through: { attributes: [] } // N'incluez pas les colonnes de la table de jonction
                },
                {
                    model: Message,
                    as: 'messages',
                    limit: 1, // Pour récupérer le dernier message si nécessaire
                    order: [['date_envoi', 'DESC']],
                    include: [{ model: Utilisateur, as: 'expediteur', attributes: ['noms', 'id_utilisateur'] }],
                    required: false // N'exclut pas les conversations sans messages
                },
                {
                    model: Courrier, // Si vous voulez les détails du courrier lié
                    as: 'courrier_associe',
                    attributes: ['objet', 'numero_courrier'],
                    required: false
                },
                {
                    model: Utilisateur,
                    as: 'members', // Inclure tous les participants de la conversation
                    attributes: ['id_utilisateur', 'noms'],
                    through: { attributes: [] }
                }
            ],
            order: [['date_dernier_activite', 'DESC']]
        });

        if (!conversations || conversations.length === 0) {
            return res.status(404).json({ message: 'Aucune conversation trouvée.' });
        }

        res.status(200).json(conversations);
    } catch (error) {
        console.error('Erreur lors de la récupération des conversations de l\'utilisateur:', error);
        next(error);
    }
};

// GET /api/conversations/:idConversation
// Récupère les détails d'une conversation spécifique, y compris les messages paginés
export const getConversationDetails = async (req, res, next) => { 
    try {
        const { idConversation } = req.params;
        const currentUserId = req.user.id_utilisateur;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        // Vérifier que l'utilisateur est bien participant de cette conversation
        const isParticipant = await ConversationParticipant.findOne({
            where: { id_conversation: idConversation, id_utilisateur: currentUserId }
        });

        if (!isParticipant) {
            return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas participant de cette conversation." });
        }

        const conversation = await Conversation.findByPk(idConversation, {
            include: [
                {
                    model: Utilisateur,
                    as: 'members', // Alias pour les participants de la conversation
                    attributes: ['id_utilisateur', 'noms'],
                    through: { attributes: [] }
                },
                {
                    model: Message,
                    as: 'messages',
                    include: [{ model: Utilisateur, as: 'expediteur', attributes: ['id_utilisateur', 'noms'] }],
                    order: [['date_envoi', 'DESC']], // Charger les plus récents en premier pour pagination inverse
                    limit: limit,
                    offset: offset
                },
                {
                    model: Courrier,
                    as: 'courrier_associe',
                    attributes: ['objet', 'numero_courrier']
                }
            ],
        });

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation non trouvée.' });
        }

        // Si la pagination est pour un chat, souvent on veut les plus anciens en premier pour afficher au fur et à mesure
        conversation.messages.sort((a, b) => new Date(a.date_envoi) - new Date(b.date_envoi));

        res.status(200).json(conversation);
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de la conversation:', error);
        next(error);
    }
};

// POST /api/conversations
// Crée une nouvelle conversation
export const createConversation = async (req, res, next) => {
    try {
        const { id_courrier, sujet, participantIds } = req.body;
        const currentUserId = req.user.id_utilisateur;

        // Vérifier si les IDs des participants sont valides
        const validParticipants = await Utilisateur.findAll({
            where: { id_utilisateur: { [Op.in]: participantIds } },
            attributes: ['id_utilisateur']
        });
        const existingParticipantIds = validParticipants.map(p => p.id_utilisateur);

        // Assurez-vous que le créateur est toujours un participant
        const allParticipantsUnique = [...new Set([currentUserId, ...existingParticipantIds])];

        if (allParticipantsUnique.length === 0) {
            return res.status(400).json({ message: "Au moins un participant valide est requis." });
        }

        // Démarrer une transaction pour assurer la cohérence
        const result = await db.sequelize.transaction(async (t) => {
            const newConversation = await Conversation.create({
                id_courrier: id_courrier || null,
                sujet: sujet || (id_courrier ? `Discussion sur le courrier ${id_courrier}` : 'Nouvelle conversation')
            }, { transaction: t });

            const participantsToCreate = allParticipantsUnique.map(userId => ({
                id_conversation: newConversation.id_conversation,
                id_utilisateur: userId
            }));

            await ConversationParticipant.bulkCreate(participantsToCreate, { transaction: t });

            // On peut aussi créer un message initial ou de bienvenue ici
            // await Message.create({
            //     id_conversation: newConversation.id_conversation,
            //     id_expediteur: currentUserId, // Ou un ID système
            //     contenu: 'Conversation créée.',
            //     type_message: 'systeme'
            // }, { transaction: t });

            return newConversation;
        });

        const createdConversation = await Conversation.findByPk(result.id_conversation, {
            include: [
                { model: Utilisateur, as: 'members', attributes: ['id_utilisateur', 'noms'], through: { attributes: [] } },
                { model: Courrier, as: 'courrier_associe', attributes: ['objet', 'numero_courrier'] }
            ]
        });

        res.status(201).json(createdConversation);
    } catch (error) {
        console.error('Erreur lors de la création de la conversation:', error);
        next(error);
    }
};

// POST /api/conversations/:idConversation/participants
// Ajoute des utilisateurs à une conversation
export const addParticipantsToConversation = async (req, res, next) => {
    try {
        const { idConversation } = req.params;
        const { userIds } = req.body; // Array of user IDs to add
        const currentUserId = req.user.id_utilisateur;

        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: "Des IDs d'utilisateurs sont requis." });
        }

        // 1. Vérifier si la conversation existe
        const conversation = await Conversation.findByPk(idConversation);
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation non trouvée.' });
        }

        // 2. Vérifier si l'utilisateur actuel est participant ou a la permission
        const isParticipant = await ConversationParticipant.findOne({
            where: { id_conversation: idConversation, id_utilisateur: currentUserId }
        });
        if (!isParticipant) {
             return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas participant de cette conversation pour ajouter des membres." });
            // Ou si vous avez un concept d'admin de conversation, vérifiez cela aussi
        }

        // 3. Filtrer les utilisateurs qui sont déjà participants
        const existingParticipants = await ConversationParticipant.findAll({
            where: {
                id_conversation: idConversation,
                id_utilisateur: { [Op.in]: userIds }
            },
            attributes: ['id_utilisateur']
        });
        const existingParticipantIds = existingParticipants.map(p => p.id_utilisateur);

        const newParticipantIds = userIds.filter(id => !existingParticipantIds.includes(id));

        if (newParticipantIds.length === 0) {
            return res.status(200).json({ message: "Tous les utilisateurs spécifiés sont déjà participants." });
        }

        // 4. Ajouter les nouveaux participants
        const participantsToAdd = newParticipantIds.map(userId => ({
            id_conversation: idConversation,
            id_utilisateur: userId
        }));

        await ConversationParticipant.bulkCreate(participantsToAdd);

        res.status(200).json({ message: 'Participants ajoutés avec succès.', addedCount: newParticipantIds.length });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de participants:', error);
        next(error);
    }
};

// DELETE /api/conversations/:idConversation/participants/:idUser
// Supprime un utilisateur d'une conversation
export const removeParticipantFromConversation = async (req, res, next) => {
    try {
        const { idConversation, idUser } = req.params;
        const currentUserId = req.user.id_utilisateur;

        // 1. Vérifier si la conversation existe
        const conversation = await Conversation.findByPk(idConversation);
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation non trouvée.' });
        }

        // 2. Vérifier si l'utilisateur qui fait la requête est autorisé à retirer (ex: admin de la conversation, ou l'utilisateur lui-même qui quitte)
        const isAuthorized = await ConversationParticipant.findOne({
            where: { id_conversation: idConversation, id_utilisateur: currentUserId }
        });
        if (!isAuthorized) {
            return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas autorisé à modifier cette conversation." });
        }

        // Vous pouvez ajouter une logique ici pour empêcher un utilisateur de retirer l'initiateur
        // ou le dernier participant, ou si le rôle de l'utilisateur actuel ne permet pas de retirer.
        if (idUser === currentUserId && (await ConversationParticipant.count({ where: { id_conversation: idConversation } }) === 1)) {
            // Empêcher le dernier participant de se retirer lui-même pour ne pas laisser de conversation orpheline
            return res.status(400).json({ message: "Vous ne pouvez pas quitter la conversation si vous êtes le seul participant." });
        }

        // 3. Supprimer le participant
        const deletedRows = await ConversationParticipant.destroy({
            where: {
                id_conversation: idConversation,
                id_utilisateur: idUser
            }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Participant non trouvé dans cette conversation.' });
        }

        res.status(200).json({ message: 'Participant supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du participant:', error);
        next(error);
    }
};


// GET /api/conversations/:idConversation/messages
// Récupère l'historique des messages d'une conversation
export const getConversationMessages = async (req, res, next) => {
    try {
        const { idConversation } = req.params;
        const currentUserId = req.user.id_utilisateur;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50; // Nombre de messages par page
        const offset = (page - 1) * limit;

        // Vérifier que l'utilisateur est bien participant de cette conversation
        const isParticipant = await ConversationParticipant.findOne({
            where: { id_conversation: idConversation, id_utilisateur: currentUserId }
        });

        if (!isParticipant) {
            return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas participant de cette conversation." });
        }

        const { count, rows: messages } = await Message.findAndCountAll({
            where: { id_conversation: idConversation },
            include: [{ model: Utilisateur, as: 'expediteur', attributes: ['id_utilisateur', 'noms'] }],
            order: [['date_envoi', 'ASC']], // Les messages les plus anciens en premier pour l'affichage chronologique
            limit: limit,
            offset: offset
        });

        res.status(200).json({
            totalMessages: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            messages: messages
        });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des messages:', error);
        next(error);
    }
};

// POST /api/messages
// Enregistre un message dans la BDD (généralement utilisé via l'API REST pour des messages non-temps réel,
// l'envoi temps réel se fait via WebSocket)
export const createMessage = async (req, res, next) => {
    try {
        const { id_conversation, contenu, type_message, url_fichier } = req.body;
        const id_expediteur = req.user.id_utilisateur;

        // Vérifier que la conversation existe et que l'utilisateur en fait partie
        const conversation = await Conversation.findByPk(id_conversation);
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation non trouvée.' });
        }

        const isParticipant = await ConversationParticipant.findOne({
            where: { id_conversation: id_conversation, id_utilisateur: id_expediteur }
        });
        if (!isParticipant) {
            return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas participant de cette conversation pour envoyer un message." });
        }

        const newMessage = await Message.create({
            id_conversation,
            id_expediteur,
            contenu,
            type_message: type_message || 'texte',
            url_fichier: url_fichier || null,
            date_envoi: new Date()
        });

        // Mettre à jour la date de dernière activité de la conversation
        await Conversation.update(
            { date_derniere_activite: new Date() }, // normallement c'est la date de dernière activité
            { where: { id_conversation: id_conversation } }
        );

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Erreur lors de la création du message:', error);
        next(error);
    }
};