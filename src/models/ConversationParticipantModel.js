import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';


/** * @swagger
 * components:
 *   schemas:
 *     ConversationParticipant:
 *       type: object
 *       properties:
 *         id_conversation:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la conversation
 *           example: '123e4567-e89b-12d3-a456-426614174000'
 *         id_utilisateur:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de l'utilisateur
 *           example: '123e4567-e89b-12d3-a456-426614174001'
 *         date_rejoint:
 *           type: string
 *           format: date-time
 *           description: Date de rejoindre la conversation
 *           example: '2023-01-01T00:00:00.000Z'
 *         est_admin:
 *           type: boolean
 *           description: Indique si l'utilisateur est admin de la conversation
 *           example: true
 */


    const ConversationParticipant = sequelize.define('ConversationParticipant', {
        id_conversation: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        id_utilisateur: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        date_rejoint: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        est_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'conversation_participants',
        timestamps: false
    });

    export default ConversationParticipant;