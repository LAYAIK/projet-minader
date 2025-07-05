import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Personnel = sequelize.define('Personnel', {
  id_personnel: {
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
    allowNull: true
  },
  adresse_email: {
    type: DataTypes.STRING(100),
    allowNull: true, // Peut être différent de l'email de l'utilisateur associé
    unique: true,
    validate: {
      isEmail: true
    }
  },
  matricule: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  date_embauche: {
    type: DataTypes.DATE,
    allowNull: false // Date d'embauche obligatoire
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: true // Date de naissance facultative
  }
}, {
  tableName: 'Personnels',
  timestamps: true,
  underscored: true
});

export default Personnel;