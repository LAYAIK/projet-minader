import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/** * Modèle de données pour les rôles.
 * Représente un rôle dans le système avec des permissions associées.
 */

/** * @typedef {Object} Role
 * @property {string} id_role - Identifiant unique du rôle (UUID).
 * @property {string} nom - Nom du rôle.
 * @property {string} [description] - Description du rôle.
 * @property {Array<string>} [Permissions] - Liste des permissions associées au rôle.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id_role:
 *           type: string
 *           format: uuid
 *         nom:
 *           type: string
 *         description:
 *           type: string
 *         Permissions:
 *           type: array
 *           items:
 *             type: string
 *             example: "read"
 * required:
 *   - id_role
 *   - nom
 */

const Role = sequelize.define('Role', {
    id_role: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true // Assumons que le role est unique
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Permet de stocker un tableau de permissions
        allowNull: true
    }
}, {
    tableName: 'Roles',
    timestamps: true,
    underscored: true
});

export default Role;