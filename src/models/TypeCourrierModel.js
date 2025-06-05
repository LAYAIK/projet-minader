import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const TypeCourrier = sequelize.define('TypeCourrier', {
  id_type_courrier: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true // Assumons que le type de courrier est unique
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Types_Courrier',
  timestamps: true,
  underscored: true
});

export default TypeCourrier;