export default (sequelize, DataTypes) => {
  
const Note = sequelize.define('Note', {
  id_note: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Notes',
  timestamps: true,
  underscored: true
});
Note.associate = (models) => {
};

return Note;

};