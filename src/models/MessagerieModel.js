import { DataTypes } from "sequelize";  
import { sequelize } from "../config/db.js";
import Utilisateur from "./UtilisateurModel.js"; // Pour la relation avec Utilisateur



const Messagerie = sequelize.define("Messagerie", {
    id_messagerie: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    sujet: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_envoi: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Date d'envoi par défaut à la date actuelle
    },
    lu: { // Indique si le message a été lu ou non
        type: DataTypes.BOOLEAN,
        defaultValue: false // Par défaut, le message n'est pas lu
    },
    // Clé étrangère vers l'expéditeur (Utilisateur)
    id_expediteur: {
        type: DataTypes.UUID,
        references: {
            model: Utilisateur, // Nom de la table des utilisateurs
            key: 'id_utilisateur'
        },
        allowNull: false // Un message doit avoir un expéditeur
    },
    // Clé étrangère vers le destinataire (Utilisateur)
    id_destinataire: {
        type: DataTypes.UUID,
        references: {
            model: Utilisateur, // Nom de la table des utilisateurs
            key: 'id_utilisateur'
        },
        allowNull: false // Un message doit avoir un destinataire
    }
}, {
    tableName: "Messageries",
    timestamps: true, // Ajoute createdAt et updatedAt
    underscored: true // Utilise snake_case pour les noms de colonnes
});

export default Messagerie;