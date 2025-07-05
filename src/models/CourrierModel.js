import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Courier:
 *       type: object
 *       properties:
 *         id_courrier:
 *           type: string
 *           format: uuid
 *         objet:
 *           type: string
 *         date_depot:
 *           type: string
 *           format: date-time
 *         numero_courrier:
 *           type: string
 *         nature:
 *           type: string
 *       required:
 *         - objet
 *         - date_depot
 *         - numero_courrier
 */

const Courrier = sequelize.define('Courrier', {
  id_courrier: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  objet: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  date_depot: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  numero_courrier: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  id_receveurs: { // Liste des ID des receveurs du courrier (ex: ['123e4567-e89b-12d3-a456-426614174000'])
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true
  },
  status: { // Statut du courrier (ex: 'En attente', 'Traité', 'Archivé')
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'En attente'
  },
  nature: { // Nature du courrier (ex: 'Demande', 'Rapport', 'Facture')
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'Courriers',
  timestamps: true,
  underscored: true
});

export default Courrier;