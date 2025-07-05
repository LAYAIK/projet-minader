import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Document = sequelize.define('Document', {
  id_document: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Documents',
  timestamps: true,
  underscored: true
});

export default Document;