export default (sequelize, DataTypes) => {
const Structure = sequelize.define('Structure', {
  id_structure: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true 
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: true // Date de transite peutêtre optionnelle
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false, // Nom de la structure obligatoire
    unique: true
  }
  
}, {
  tableName: 'Structures',
  timestamps: true, // Ajoute createdAt et updatedAt
  underscored: true // Utilise snake_case pour les noms de colonnes
});

// association avec la table Courrier
Structure.associate = (models) => {
  Structure.hasMany(models.Courrier, {foreignKey: 'id_structure' });
  Structure.belongsToMany(models.Courrier, { through: models.Transiter,   foreignKey: 'id_structure_expediteur', targetKey: 'id_structure',  otherKey: 'id_courrier',  });
  Structure.belongsToMany(models.Courrier, { through: models.Transiter,   foreignKey: 'id_structure_destinataire', targetKey: 'id_structure',  otherKey: 'id_courrier',  });
  Structure.belongsToMany(models.Document, { through: models.Transiter,   foreignKey: 'id_structure_destinataire',   otherKey: 'id_document',  });
  Structure.hasMany(models.Personnel, {foreignKey: 'id_structure' });
};

return Structure;

};