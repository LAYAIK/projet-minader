import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Courrier from './CourrierModel.js'; // Pour la relation avec Courrier
import TypeCourrier from './TypeCourrierModel.js'; // Pour la relation avec Type_courrier

const PieceJointe = sequelize.define('PieceJointe', {
  id_piece_jointe: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Clé étrangère vers Courrier (relation "Posseder")
  id_courrier: {
    type: DataTypes.UUID,
    references: {
      model: Courrier,
      key: 'id_courrier'
    },
    allowNull: false 
  },
  // Clé étrangère vers Type_courrier 
  id_type_courrier: {
    type: DataTypes.UUID,
    references: {
      model: TypeCourrier,
      key: 'id_type_courrier'
    },
    allowNull: true 
  }
}, {
  tableName: 'Pieces_Jointes',
  timestamps: true,
  underscored: true
});

export default PieceJointe;