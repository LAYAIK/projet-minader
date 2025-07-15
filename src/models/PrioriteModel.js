export default (sequelize, DataTypes) => {
const Priorite = sequelize.define('Priorite', {
  id_priorite: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  niveau: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true // Assumons que le niveau de priorité est unique (ex: 'Haute', 'Normale', 'Basse')
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Priorites',
  timestamps: true,
  underscored: true
});
// relations
  Priorite.associate = (models) => {
    Priorite.hasMany(models.Courrier, { foreignKey: 'id_priorite' });
    Priorite.belongsToMany(models.Courrier, { through: models.Transiter, foreignKey: 'id_priorite', otherKey: 'id_courrier' });
  };

  return Priorite;
}
