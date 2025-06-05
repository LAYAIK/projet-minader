import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Courrier from './CourrierModel.js'; // Pour la relation avec Courrier

const Note = sequelize.define('Note', {
  id_note: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Clé étrangère vers Courrier (relation "Contenir")
  id_courrier: {
    type: DataTypes.UUID,
    references: {
      model: Courrier,
      key: 'id_courrier'
    },
    allowNull: false // Une note doit être liée à un courrier
  }
}, {
  tableName: 'Notes',
  timestamps: true,
  underscored: true
});

export default Note;