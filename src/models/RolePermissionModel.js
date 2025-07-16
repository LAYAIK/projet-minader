export default (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    id_role_permission: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'Roles_Permissions',
    timestamps: false
  });

  return RolePermission;
};
