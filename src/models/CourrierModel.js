
export default (sequelize, DataTypes) => {
  const Courrier = sequelize.define('Courrier', {
    id_courrier: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    numero_courrier: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    date_reception: { // Date de réception du courrier
      type: DataTypes.DATE,
      allowNull: true
    },
    date_envoi: { // Date d'envoi du courrier
      type: DataTypes.DATE,
      allowNull: true
    },
    date_traitement: { // Date de traitement du courrier
      type: DataTypes.DATE,
      allowNull: true
    },
    est_archive: { // Indique si le courrier est archivé (true/false)
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    date_archivage: { // Date d'archivage du courrier
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    tableName: 'Courriers',
    timestamps: true,
    underscored: true
  });

  // les associations
  Courrier.associate = (models) => {
    Courrier.belongsTo(models.Status, { foreignKey: 'id_status', targetKey: 'id_status', onUpdate: 'SET NULL', onDelete: 'CASCADE' });
    Courrier.belongsTo(models.Priorite , { foreignKey: 'id_priorite', targetKey: 'id_priorite', onUpdate: 'SET NULL', onDelete: 'CASCADE' });
    Courrier.belongsTo(models.Objet, { foreignKey: 'id_objet', targetKey: 'id_objet', onUpdate: 'SET NULL', onDelete: 'CASCADE' });
    Courrier.belongsTo(models.TypeCourrier, { foreignKey: 'id_type_courrier', targetKey: 'id_type_courrier', onUpdate: 'SET NULL', onDelete: 'CASCADE' });
    Courrier.hasMany(models.Document, { foreignKey: 'id_courrier',targetKey: 'id_courrier', onUpdate: 'SET NULL', onDelete: 'CASCADE' });
    Courrier.belongsTo(models.Structure, { foreignKey: 'id_structure', targetKey: 'id_structure', onUpdate: 'SET NULL', onDelete: 'CASCADE' });
    Courrier.belongsTo(models.Utilisateur, {foreignKey: 'id_utilisateur',  targetKey: 'id_utilisateur',   onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    Courrier.belongsToMany(models.Utilisateur, { through: models.CourrierUtilisateur,   foreignKey: 'id_courrier',   otherKey: 'id_expediteur',  });
    Courrier.belongsToMany(models.Utilisateur, { through: models.CourrierUtilisateur,   foreignKey: 'id_courrier',   otherKey: 'id_destinataire', });
    Courrier.belongsToMany(models.Structure, { through: models.Transiter,   foreignKey: 'id_courrier',   otherKey: 'id_structure_expediteur',  });
    Courrier.belongsToMany(models.Structure, { through: models.Transiter,   foreignKey: 'id_courrier',   otherKey: 'id_structure_destinataire',  });
    Courrier.belongsTo(models.Role, { through: models.Transiter,   foreignKey: 'id_courrier',   otherKey: 'id_role',  });
    Courrier.belongsTo(models.Status, { through: models.Transiter,   foreignKey: 'id_courrier',   otherKey: 'id_status',  });
    Courrier.belongsTo(models.Priorite, { through: models.Transiter,   foreignKey: 'id_courrier',   otherKey: 'id_priorite',  });
    Courrier.belongsTo(models.Objet, { through: models.Transiter,   foreignKey: 'id_courrier',   otherKey: 'id_objet',  });
    Courrier.hasOne(models.Archive, { foreignKey: 'id_courrier' });
    
    //Courrier.belongsToMany(models.Utilisateur, { through: models.Transiter,   foreignKey: 'id_courrier',   otherKey: 'id_utilisateur',  });
  };

  return Courrier;
}

