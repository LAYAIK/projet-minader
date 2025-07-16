export default (sequelize, DataTypes) => {
  const UtilisateurRole = sequelize.define('UtilisateurRole', {
    id_utilisateur_role: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'Utilisateurs_Roles',
    timestamps: false
  });

  return UtilisateurRole;
};
