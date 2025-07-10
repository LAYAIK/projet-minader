import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';


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
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  numero_courrier: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  id_destinataires: { // Liste des ID des receveurs du courrier (ex: ['123e4567-e89b-12d3-a456-426614174000'])
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true
  },
  status: { // Statut du courrier (ex: 'En attente', 'Traité', 'Archivé')
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'En attente'
  },
  priorite: { // Priorité du courrier (ex: 'Haute', 'Normale', 'Basse')
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 'Normale'
  },
  id_structure: { // ID de la structure associée au courrier
    type: DataTypes.UUID,
    allowNull: true
  },
  date_reception: { // Date de réception du courrier
    type: DataTypes.DATE,
    allowNull: true
  },
  date_envoi: { // Date d'envoi du courrier
    type: DataTypes.DATE,
    allowNull: true
  },
  date_traitement: { // Date de traitement du courrier
    type: DataTypes.DATE,
    allowNull: true
  },
  est_archive: { // Indique si le courrier est archivé (true/false)
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  documents_associes: { // Liste des IDs des documents associés au courrier (ex: ['123e4567-e89b-12d3-a456-426614174000'])
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true
  },
  nature: { // Nature du courrier (ex: 'Demande', 'Rapport', 'Facture')
    type: DataTypes.STRING(100),
    allowNull: true
  },
  date_archivage: { // Date d'archivage du courrier
    type: DataTypes.DATE,
    allowNull: true
  },
  
  id_expediteur: { // ID de l'expéditeur du courrier
    type: DataTypes.UUID,
    allowNull: true
  },
  type_courrier: { // Type de courrier (ex: 'Entrant', 'Sortant'. 'Interne')
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'Courriers',
  timestamps: true,
  underscored: true
});

export default Courrier;