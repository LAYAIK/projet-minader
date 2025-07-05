import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

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
    }
}, {
    tableName: "Archives",
    timestamps: true,
    underscored: true
});

export default Archive;