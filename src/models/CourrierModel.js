import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Utilisateur from './UtilisateurModel.js'; // Pour l'expéditeur
import TypeCourrier from './TypeCourrierModel.js'; // Pour le type de courrier
import Structure from './StructureModel.js'; // Pour la structure de transit

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
  type: { // Type de courrier (ex: 'Entrant', 'Sortant', 'Interne')
    type: DataTypes.STRING(50),
    allowNull: true 
  },
  nature: { // Nature du courrier (ex: 'Demande', 'Rapport', 'Facture')
    type: DataTypes.STRING(100),
    allowNull: true
  },
  // Clé étrangère vers Utilisateur (relation "Envoyer")
  id_expediteur: { // Renommé pour clarté
    type: DataTypes.UUID,
    references: {
      model: Utilisateur,
      key: 'id_utilisateur'
    },
    allowNull: true 
  },
  // Clé étrangère vers Type_courrier 
  id_type_courrier: {
    type: DataTypes.UUID,
    references: {
      model: TypeCourrier,
      key: 'id_type_courrier'
    },
    allowNull: false 
  },
  // Clé étrangère vers Structure (relation "Transiter")
  id_structure_actuelle: { // La structure où le courrier se trouve actuellement
    type: DataTypes.UUID,
    references: {
      model: Structure,
      key: 'id_structure'
    },
    allowNull: true // Un courrier peut ne pas être dans une structure spécifique au début
  }
}, {
  tableName: 'Courriers',
  timestamps: true,
  underscored: true
});

export default Courrier;