export default (sequelize, DataTypes) => {
const Utilisateur = sequelize.define('Utilisateur', {
  id_utilisateur: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  noms: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prenoms: {
    type: DataTypes.STRING(100),
    allowNull: true // Prénoms peuvent être optionnels
  },
  adresse_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  fonction: { // Ex: 'Administrateur', 'Utilisateur', 'Agent'
    type: DataTypes.STRING(100),
    allowNull: true
  },
  direction: { // Ex: 'Direction Générale', 'Ressources Humaines', 'Finance'
    type: DataTypes.STRING(100),
    allowNull: true
  },
  justificatif: { // Ex: 'Justificatif de fonction', 'Justificatif de direction'
    type: DataTypes.STRING(255),
    allowNull: true, // Justificatif peut être optionnel
  },
  is_actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Par défaut, l'utilisateur n'est pas actif
    allowNull: false
  }
}, {
  tableName: 'Utilisateurs',
  timestamps: true,
  underscored: true,
});
// Association entre Utilisateur et Structure
Utilisateur.associate = (models) => {
  Utilisateur.belongsTo(models.Structure, { foreignKey: 'id_structure', targetKey: 'id_structure', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
  Utilisateur.hasMany(models.Courrier, { foreignKey: 'id_utilisateur',   onDelete: 'SET NULL',   onUpdate: 'CASCADE'  });
  Utilisateur.belongsToMany(models.Courrier, { through: models.CourrierUtilisateur,  foreignKey: 'id_expediteur', targetKey: 'id_utilisateur',  otherKey: 'id_courrier' });
  Utilisateur.belongsToMany(models.Courrier, { through: models.CourrierUtilisateur,  foreignKey: 'id_destinataire', targetKey: 'id_utilisateur',  otherKey: 'id_courrier' });
  //Utilisateur.belongsToMany(models.Courrier, { through: models.Transiter, foreignKey: 'id_utilisateur', otherKey: 'id_courrier' });
  Utilisateur.belongsToMany(models.Role, { through: models.UtilisateurRole, foreignKey: 'id_utilisateur', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
  Utilisateur.hasOne(models.Role, { foreignKey: 'id_role', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
  Utilisateur.hasMany(models.Archive, { foreignKey: 'id_utilisateur',   onDelete: 'SET NULL',   onUpdate: 'CASCADE'  });
};
return Utilisateur;
};