export default (sequelize, DataTypes) => {
  const Objet = sequelize.define('Objet', {
    id_objet: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    libelle: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Objets',
    timestamps: true,
    underscored: true
  });
  // associations
  Objet.associate = function (models) {
    Objet.hasMany(models.Courrier, { foreignKey: 'id_objet' });
    Objet.belongsToMany(models.Courrier, { through: models.Transiter, foreignKey: 'id_objet', otherKey: 'id_courrier' });
  };

  return Objet;
};
