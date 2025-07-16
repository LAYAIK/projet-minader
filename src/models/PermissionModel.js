export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id_permission: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Permissions',
    timestamps: true,
    underscored: true
  });
  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, { through: models.RolePermission, foreignKey: 'id_permission',ortherkey: 'id_role' ,onUpdate: 'CASCADE', onDelete: 'CASCADE' });
  };    
  return Permission;
};
