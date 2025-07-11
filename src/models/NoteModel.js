import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

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
  }
}, {
  tableName: 'Notes',
  timestamps: true,
  underscored: true
});

export default Note;