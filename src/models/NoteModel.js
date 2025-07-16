export default (sequelize, DataTypes) => {
  
const Note = sequelize.define('Note', {
  id_note: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Notes',
  timestamps: true,
  underscored: true
});
Note.associate = (models) => {
  Note.belongsTo(models.Courrier);
  Note.belongsToMany(models.Structure, { through: models.Transiter});
};

return Note;

};