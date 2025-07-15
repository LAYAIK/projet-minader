export default (sequelize, DataTypes) => {
  const CourrierUtilisateur = sequelize.define('CourrierUtilisateur', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    date_transmission: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Courriers_Utilisateurs',
    timestamps: false
  });

  return CourrierUtilisateur;
};
