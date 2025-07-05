import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import bcrypt from 'bcrypt';

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
 *           description: Identifiant unique de l'utilisateur
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         noms:
 *           type: string
 *           example: "Dupont"
 *           description: Nom de l'utilisateur
 *         prenoms:
 *           type: string
 *           example: "Jean"
 *         adresse_email:
 *           type: string
 *           format: email
 *           example: "admin@gmail.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "password123"
 *         fonction:
 *           type: string
 *           example: "admin"
 *         direction:
 *           type: string
 *           example: "Direction Générale"
 *         justificatif:
 *           type: string
 *           example: "Justificatif de fonction"
 *         date_demande:
 *           type: string
 *           format: date-time
 *      
 */

const Utilisateur = sequelize.define('Utilisateur', {
  id_utilisateur: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  noms: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prenoms: {
    type: DataTypes.STRING(100),
    allowNull: true // Prénoms peuvent être optionnels
  },
  adresse_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  fonction: { // Ex: 'Administrateur', 'Utilisateur', 'Agent'
    type: DataTypes.STRING(100),
    allowNull: true
  },
  direction: { // Ex: 'Direction Générale', 'Ressources Humaines', 'Finance'
    type: DataTypes.STRING(100),
    allowNull: true
  },
  justificatif: { // Ex: 'Justificatif de fonction', 'Justificatif de direction'
    type: DataTypes.STRING(255),
    allowNull: true, // Justificatif peut être optionnel
  },
  is_actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Par défaut, l'utilisateur n'est pas actif
    allowNull: false
  }
}, {
  tableName: 'Utilisateurs',
  timestamps: true,
  underscored: true,
});

export default Utilisateur;