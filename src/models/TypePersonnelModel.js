import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const TypePersonnel = sequelize.define('TypePersonnel', {
  id_type_personnel: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true // Assumons que le type de personnel est unique
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Types_Personnel',
  timestamps: true,
  underscored: true
});

export default TypePersonnel;