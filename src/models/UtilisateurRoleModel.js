import pkg from 'joi';
const { date } = pkg;
export default (sequelize, DataTypes) => {
  const UtilisateurRole = sequelize.define('UtilisateurRole', {
    id_utilisateur_role: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    date_attribution: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    date_suppression: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_modification: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Utilisateurs_Roles',
    timestamps: true
  });

  return UtilisateurRole;
};
