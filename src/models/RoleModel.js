export default (sequelize, DataTypes) => {    
const Role = sequelize.define('Role', {
    id_role: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true // Assumons que le role est unique
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Roles',
    timestamps: true,
    underscored: true
});
Role.associate = (models) => {
    Role.belongsToMany(models.Utilisateur, { through: models.UtilisateurRole, foreignKey: 'id_role', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
    Role.belongsToMany(models.Permission, { through: models.RolePermission, foreignKey: 'id_role', ortherkey: 'id_permission', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
    Role.belongsToMany(models.Courrier, { through: models.Transiter, foreignKey: 'id_role', otherKey: 'id_courrier' });
    
};

return Role;
};