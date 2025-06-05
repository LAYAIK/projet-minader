import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Courrier from './CourrierModel.js';
import Utilisateur from './UtilisateurModel.js'; // Pour la relation avec Utilisateur

const Archive = sequelize.define("Archive", {
    id_archive: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_archivage: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Date d'archivage par défaut à la date actuelle
    },
    id_courrier: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Courrier, // Nom de la table des courriers
            key: "id_courrier"
        },
       allowNull: false // Un courrier doit être associé à une archive 
    },
    // Clé étrangère vers Utilisateur (si un Personnel est aussi un Utilisateur du système)
  id_utilisateur: {
    type: DataTypes.UUID,
    references: {
      model: Utilisateur,
      key: 'id_utilisateur'
    },
    allowNull: true // Peut être null si un personnel n'a pas forcément un compte utilisateur
  }
}, {
    tableName: "Archives",
    timestamps: true,
    underscored: true
});

export default Archive;