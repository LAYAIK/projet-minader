
export default (sequelize, DataTypes) => {
const Status = sequelize.define('Status', {
    id_status: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    libelle: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Statuses',
    timestamps: true,
    underscored: true
});
// associer le modèle à la base de données
Status.associate = (models) => {
    Status.hasMany(models.Courrier, { foreignKey: 'id_status' });
    Status.belongsToMany(models.Courrier, { through : models.Transiter, foreignKey: 'id_status', otherKey: 'id_courrier' });
  };

return Status;
}