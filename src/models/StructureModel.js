import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Structure = sequelize.define('Structure', {
  id_structure: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true 
  },
  date_transite: {
    type: DataTypes.DATE,
    allowNull: true // Date de transite peut être optionnelle
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false // Nom de la structure obligatoire
  }
  
}, {
  tableName: 'Structures',
  timestamps: true, // Ajoute createdAt et updatedAt
  underscored: true // Utilise snake_case pour les noms de colonnes
});

export default Structure;