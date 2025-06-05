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
 *         noms:
 *           type: string
 *         prenoms:
 *           type: string
 *         adresse_email:
 *           type: string
 *         password:
 *           type: string
 *         matricule:
 *           type: string
 *         fonction:
 *           type: string
 *         direction:
 *           type: string
 *         justificatif:
 *           type: string
 *         date_demande:
 *           type: string
 *           format: date-time
 *         date_naissance: 
 *           type: string
 *         role:
 *           type: string
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
  matricule: {
    type: DataTypes.STRING(50),
    allowNull: true, 
    unique: true
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
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: true, // Date de naissance peut être optionnelle
  },
  date_demande: {
      type: DataTypes.DATE,
      allowNull: true, // Date de demande peut être optionnelle
  },  
  role: { // Ex: 'admin', 'user', 'agent'
    type: DataTypes.STRING(50),
    defaultValue: 'user',
    allowNull: false
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
  // hooks: {
  //   beforeCreate: async (utilisateur) => {
  //     if (utilisateur.mot_de_passe) {
  //       const salt = await bcrypt.genSalt(10);
  //       utilisateur.mot_de_passe = await bcrypt.hash(utilisateur.mot_de_passe, salt);
  //     }
  //   },
  //   beforeUpdate: async (utilisateur) => {
  //     if (utilisateur.changed('mot_de_passe') && utilisateur.mot_de_passe) {
  //       const salt = await bcrypt.genSalt(10);
  //       utilisateur.mot_de_passe = await bcrypt.hash(utilisateur.mot_de_passe, salt);
  //     }
  //   }
  // }
});

// Méthode d'instance pour comparer les mots de passe
// Utilisateur.prototype.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.mot_de_passe);
// };

export default Utilisateur;