import { DataTypes } from "sequelize";  
import { sequelize } from "../config/db.js";



const Messagerie = sequelize.define("Messagerie", {
    id_messagerie: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    sujet: {
        type: DataTypes.STRING(250),
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
    }
}, {
    tableName: "Messageries",
    timestamps: true, // Ajoute createdAt et updatedAt
    underscored: true // Utilise snake_case pour les noms de colonnes
});

export default Messagerie;