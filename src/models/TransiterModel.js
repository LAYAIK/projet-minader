import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Courrier from './CourrierModel.js';
import Structure from './StructureModel.js';

const Transiter = sequelize.define('Transiter', {
  id: { // Clé primaire pour la table de jonction
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  date_transite: {
    type: DataTypes.DATE, // Ou DataTypes.DATEONLY si seulement la date
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Clés étrangères définies via les associations dans index.js
}, {
  tableName: 'Transits',
  timestamps: true,
  underscored: true
});

export default Transiter;