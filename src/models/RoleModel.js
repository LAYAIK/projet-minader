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
    },
    Permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Permet de stocker un tableau de permissions
        allowNull: true
    }
}, {
    tableName: 'Roles',
    timestamps: true,
    underscored: true
});
Role.associate = (models) => {
    Role.hasMany(models.Utilisateur, { foreignKey: 'id_role' });
    Role.belongsToMany(models.Courrier, { through: models.Transiter, foreignKey: 'id_role', otherKey: 'id_courrier' });
};

return Role;
};