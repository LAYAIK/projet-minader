// server.js (ou un fichier websocket.js si vous le séparez)
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
// ... vos autres imports (app, db, routes, etc.) ...

const app = express();
const server = http.createServer(app); // Créez un serveur HTTP à partir de votre application Express

// Initialisation de Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001", // L'URL de votre frontend
        methods: ["GET", "POST"]
    }
});

// Middleware d'authentification pour Socket.IO (très important !)
// Vous devrez adapter ceci à votre logique d'authentification (ex: vérifier un JWT)
io.use(async (socket, next) => {
    const token = socket.handshake.auth.token; // Ou socket.handshake.headers.authorization
    if (!token) {
        return next(new Error('Authentification requise pour WebSocket'));
    }
    try {
        // Implémentez ici la vérification de votre JWT
        // Exemple (adaptez à votre lib JWT, ex: jsonwebtoken)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id; // Stockez l'ID de l'utilisateur sur l'objet socket
        // Vous pouvez aussi récupérer d'autres infos utilisateur et les attacher à socket
        const user = await Utilisateur.findByPk(socket.userId, { attributes: ['id_utilisateur', 'noms', 'prenoms'] });
        socket.user = user;
        next();
    } catch (error) {
        console.error('Erreur d\'authentification WebSocket:', error.message);
        next(new Error('Échec de l\'authentification WebSocket'));
    }
});


io.on('connection', (socket) => {
    console.log(`Utilisateur connecté via WebSocket: ${socket.userId}`);

    // Rejoindre toutes les conversations dont l'utilisateur est membre
    // C'est mieux de le faire au niveau du contrôleur ou au login si l'utilisateur a beaucoup de conversations
    // Ou de demander au client de rejoindre des "rooms" spécifiques quand il ouvre une conversation
    // Pour cet exemple, l'utilisateur rejoint une "room" basée sur son ID pour les notifications directes
    socket.join(socket.userId.toString());

    // Rejoindre les rooms des conversations auxquelles l'utilisateur participe
    // Idéalement, cela se fait quand l'utilisateur sélectionne une conversation dans le frontend
    socket.on('join_conversation', async (conversationId) => {
        try {
            // Vérifier si l'utilisateur est participant de cette conversation avant de le laisser joindre la room
            const participant = await db.ConversationParticipant.findOne({
                where: { id_conversation: conversationId, id_utilisateur: socket.userId }
            });

            if (participant) {
                socket.join(conversationId.toString());
                console.log(`Utilisateur ${socket.userId} a rejoint la conversation ${conversationId}`);
                socket.emit('joined_conversation', conversationId); // Confirmer au client
            } else {
                console.warn(`Utilisateur ${socket.userId} non autorisé à rejoindre la conversation ${conversationId}`);
                socket.emit('error', 'Non autorisé à rejoindre cette conversation.');
            }
        } catch (error) {
            console.error(`Erreur lors de la jonction de la conversation ${conversationId}:`, error);
            socket.emit('error', 'Erreur interne lors de la jonction.');
        }
    });

    // Écouter les nouveaux messages
    socket.on('send_message', async ({ conversationId, contenu }) => {
        try {
            // Vérifier si l'utilisateur est participant
            const isParticipant = await db.ConversationParticipant.findOne({
                where: { id_conversation: conversationId, id_utilisateur: socket.userId }
            });

            if (!isParticipant) {
                return socket.emit('error', 'Non autorisé à envoyer des messages dans cette conversation.');
            }

            // Sauvegarder le message en base de données
            const newMessage = await db.Message.create({
                id_conversation: conversationId,
                id_expediteur: socket.userId,
                contenu: contenu
            });

            // Récupérer les détails de l'expéditeur pour le frontend
            const messageWithSender = await db.Message.findByPk(newMessage.id_message, {
                include: [{ model: Utilisateur, as: 'expediteur', attributes: ['id_utilisateur', 'nom', 'prenom'] }]
            });

            // Émettre le message à tous les participants de la conversation
            io.to(conversationId.toString()).emit('receive_message', messageWithSender);

            // Optionnel : notifier les autres participants qui ne sont pas dans la même "room" de conversation
            // (ex: s'ils sont sur la liste des conversations et ont besoin d'une notification)
            const otherParticipants = await db.ConversationParticipant.findAll({
                where: {
                    id_conversation: conversationId,
                    id_utilisateur: { [Op.ne]: socket.userId }
                }
            });
            otherParticipants.forEach(participant => {
                // Envoyer une notification directe à l'utilisateur si nécessaire
                io.to(participant.id_utilisateur.toString()).emit('new_message_notification', {
                    conversationId: conversationId,
                    messagePreview: contenu.substring(0, 50) + '...',
                    sender: socket.user.nom + ' ' + socket.user.prenom
                });
            });

        } catch (error) {
            console.error('Erreur lors de l\'envoi du message via WebSocket:', error);
            socket.emit('error', 'Erreur interne lors de l\'envoi du message.');
        }
    });

    // Écouter quand l'utilisateur marque les messages comme lus
    socket.on('mark_as_read', async (conversationId) => {
        try {
            await db.Message.update({ lu: true }, {
                where: {
                    id_conversation: conversationId,
                    id_expediteur: { [Op.ne]: socket.userId },
                    lu: false
                }
            });
            // Confirmer au client que les messages ont été marqués comme lus
            socket.emit('messages_marked_as_read', conversationId);
            // Optionnel : notifier les autres que les messages ont été lus (pour un indicateur "vu")
            // io.to(conversationId.toString()).emit('message_read_by_user', { conversationId, userId: socket.userId });
        } catch (error) {
            console.error('Erreur lors du marquage des messages comme lus via WebSocket:', error);
            socket.emit('error', 'Erreur interne lors du marquage comme lu.');
        }
    });

    socket.on('disconnect', () => {
        console.log(`Utilisateur déconnecté via WebSocket: ${socket.userId}`);
    });
});

// Assurez-vous que votre serveur Express écoute via le serveur HTTP
server.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT || 3000}`);
});

// Exportez 'io' si vous avez besoin de l'utiliser ailleurs (par ex. pour émettre des événements depuis d'autres contrôleurs)
// export const getIoInstance = () => io;