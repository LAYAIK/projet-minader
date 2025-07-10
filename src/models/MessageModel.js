import { DataTypes } from "sequelize";  
import { sequelize } from "../config/db.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id_message:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du message
 *           example: '123e4567-e89b-12d3-a456-426614174000'
 *         sujet:
 *           type: string
 *           description: Sujet du message
 *           example: 'Sujet du message'
 *         contenu:
 *           type: string
 *           description: Contenu du message
 *           example: 'Contenu du message'
 *         date_envoi:
 *           type: string
 *           format: date-time
 *           description: Date d'envoi du message
 *           example: '2023-01-01T00:00:00.000Z'
 *         id_expediteur:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de l'expéditeur du message
 *           example: '123e4567-e89b-12d3-a456-426614174001'
 *         id_conversation:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la conversation auquel le message appartient
 *           example: '123e4567-e89b-12d3-a456-426614174002'
 *         id_courrier:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du courrier auquel le message est lié (optionnel)   
 *           example: '123e4567-e89b-12d3-a456-426614174003'
 *         lu:
 *           type: boolean
 *           description: Indique si le message a été lu ou non
 *           example: true
 */



const Message = sequelize.define("Message", {
    id_message: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    sujet: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_envoi: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Date d'envoi par défaut à la date actuelle
    },
    id_expediteur: { // Référence à l'utilisateur qui envoie le message
        type: DataTypes.UUID,
        allowNull: false
    },
    id_conversation: { // Référence à la conversation à laquelle le message appartient
        type: DataTypes.UUID,
        allowNull: false
    },
    id_courrier: { // Référence au courrier si le message est lié à un courrier
        type: DataTypes.UUID,
        allowNull: true // Peut être null si le message n'est pas lié à un courrier
    },
    lu: { // Indique si le message a été lu ou non
        type: DataTypes.BOOLEAN,
        defaultValue: false // Par défaut, le message n'est pas lu
    }
}, {
    tableName: "Messages",
    timestamps: true, // Ajoute createdAt et updatedAt
    underscored: true // Utilise snake_case pour les noms de colonnes
});

export default Message;