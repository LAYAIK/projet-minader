import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Utilisateur from './UtilisateurModel.js'; // Pour la relation avec Utilisateur
import TypePersonnel from './TypePersonnelModel.js'; // Pour la relation avec Type_Personnel
import Structure from './StructureModel.js'; // Pour la relation avec Structure
import TypeCourrier from './TypeCourrierModel.js'; // Pour la relation avec Type_courrier

const Personnel = sequelize.define('Personnel', {
  id_personnel: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  noms: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prenoms: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  adresse_email: {
    type: DataTypes.STRING(100),
    allowNull: true, // Peut être différent de l'email de l'utilisateur associé
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mot_de_passe: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
  matricule: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  role: { //  (ex: 'Agent', 'Directeur', 'Expert')
    type: DataTypes.STRING(50),
    allowNull: false
  },
  // Clé étrangère vers Utilisateur (si un Personnel est aussi un Utilisateur du système)
  id_utilisateur: {
    type: DataTypes.UUID,
    references: {
      model: Utilisateur,
      key: 'id_utilisateur'
    },
    allowNull: true // Peut être null si un personnel n'a pas forcément un compte utilisateur
  },
  date_embauche: {
    type: DataTypes.DATE,
    allowNull: false // Date d'embauche obligatoire
  },
    date_fin_contrat: {
    type: DataTypes.DATE,
    allowNull: false // Date de fin de contrat obligatoire
  },
  // Clé étrangère vers TypePersonnel (relation "Avoir")
  id_type_personnel: {
    type: DataTypes.UUID,
    references: {
      model: TypePersonnel,
      key: 'id_type_personnel'
    },
    allowNull: false // Un personnel doit avoir un type de personnel
  },
  // Clé étrangère vers Structure (relation "Disposer")
  id_structure: {
    type: DataTypes.UUID,
    references: {
      model: Structure,
      key: 'id_structure'
    },
    allowNull: false // Un personnel doit appartenir à une structure
  },
  // Clé étrangère vers TypeCourrier (relation "Posseder" - interprétée comme un personnel gère un type de courrier)
  id_type_courrier: {
    type: DataTypes.UUID,
    references: {
      model: TypeCourrier,
      key: 'id_type_courrier'
    },
    allowNull: true // Un personnel peut être spécialisé dans un type de courrier, mais pas obligatoire
  }
}, {
  tableName: 'Personnels',
  timestamps: true,
  underscored: true
});

export default Personnel;