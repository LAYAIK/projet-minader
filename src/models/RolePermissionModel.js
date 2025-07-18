import pkg from 'joi';
const { date } = pkg;
export default (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    id_role_permission: {
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
    tableName: 'Roles_Permissions',
    timestamps: false
  });

  return RolePermission;
};
