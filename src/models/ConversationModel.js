import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/** 
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       properties:
 *         id_conversation:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la conversation
 *           example: '123e4567-e89b-12d3-a456-426614174000'
 *         type:
 *           type: string
 *           enum: ['direct', 'group', 'courrier_contextuel']
 *           description: Type de conversation (directe, de groupe, ou contextuelle liée à un courrier)
 *           example: 'direct'
 *         id_courrier:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique du courrier lié (optionnel)
 *           example: '123e4567-e89b-12d3-a456-426614174001'
 *         sujet:
 *           type: string
 *           description: Sujet de la conversation (optionnel)
 *           example: 'Discussion sur le projet X'
 *         date_creation:
 *           type: string
 *           format: date-time
 *           description: Date de création de la conversation
 *           example: '2023-10-01T12:00:00Z'
 */
    const Conversation = sequelize.define('Conversation', {
        id_conversation: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING, // 'direct', 'group', 'courrier_contextuel'
            allowNull: false
        },
        id_courrier: {
            type: DataTypes.UUID,
            allowNull: true // Peut être null si la conversation n'est pas liée à un courrier
        },
        sujet: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_derniere_activite: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        date_creation: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'conversations',
        timestamps: false // Gérer manuellement la date de création
    });
    export default Conversation;
