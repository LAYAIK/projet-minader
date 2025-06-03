import { DataTypes } from 'sequelize'; // Import DataTypes for defining column types
import { sequelize } from '../config/db.js'; // Import de la classe sequelize de Sequelize

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - id
 *        - email
 *        - password
 *       properties:
 *         id:
 *           type: string
 *           description: value unique de l'utilisateur
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         email:
 *           type: string
 *           example: "YdL0v@example.com"
 *           description: Adresse email unique de l'utilisateur
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur (hashé en production)
 *           example: "password123"
 *         nom:
 *           type: string
 *           description: Nom de l'utilisateur
 *           example: "Doe"
 *         prenom:
 *           type: string
 *           description: Prénom de l'utilisateur
 *           example: "John"
 *         role:
 *           type: string
 *           description: Role de l'utilisateur
 *           example: "admin"
 * 
 */

// Définition du modèle User avec Sequelize

const User = sequelize.define('User', { // 'User' est le nom du modèle (sera 'Users' en table par défaut)
  id: {
    type: DataTypes.UUID, // Utilisez UUID pour des identifiants uniques universels
    defaultValue: DataTypes.UUIDV4, // Génère un UUID v4 automatiquement
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // Validation Sequelize pour s'assurer que c'est un format email
    }
  },
  password: {
    type: DataTypes.STRING, // Stockera le hash du mot de passe
    allowNull: false
  },
  // Exemple de champs supplémentaires
  nom: {
    type: DataTypes.STRING(100),
    allowNull: true // Peut être null
  },
    prenom: {
    type: DataTypes.STRING(100),
    allowNull: true // Peut être null
  },
  matricule: {
    type: DataTypes.STRING(100),
    allowNull: true, // Peut être null
    unique: true // Doit être unique
  },
  nom_complet: {
    type: DataTypes.STRING(150),
    allowNull: true // Peutêtre null  
  },
  fonction: {
    type: DataTypes.STRING(100),
    allowNull: true // Peut être null
  },
    date_naissance: {
        type: DataTypes.DATEONLY, // Date sans heure
        allowNull: true // Peut être null
    },
    date_embauche: {
        type: DataTypes.DATEONLY, // Date sans heure
        allowNull: true // Peutêtre null
    },
    date_fin_contrat: {
        type: DataTypes.DATEONLY, // Date sans heure
        allowNull: true // Peut être null
    },
    direction: {
    type: DataTypes.STRING(100), // Direction de l'utilisateur
    allowNull: true // Peut être null
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'), // Enum pour les rôles
    defaultValue: 'user', // Valeur par défaut
    allowNull: false // Ne peut pas être null
  },
  justificatif: {
    type: DataTypes.STRING(255), // Justificatif de l'utilisateur
    allowNull: true // Peut être null
  },
  statut_compte: {
    type: DataTypes.ENUM('actif', 'inactif'), // Enum pour les statuts
    defaultValue: 'inactif', // Valeur par défaut
    allowNull: false // Ne peut pas être null
  },
  date_demande: {
    type: DataTypes.DATE, // Date et heure de la demande d'accès
    allowNull: true, // Peut être null
  }
}, {
  // Options du modèle
  tableName: 'Users', // Nom de la table dans la base de données (par défaut 'Users' pour le modèle 'User')
  timestamps: true, // Ajoute automatiquement les champs 'createdAt' et 'updatedAt'
  underscored: true, // Utilise snake_case pour les noms de colonnes (ex: created_at au lieu de createdAt)
  freezeTableName: false // Ne pas geler le nom de la table, permet à Sequelize de pluraliser
});

export default User; // Exportez le modèle défini