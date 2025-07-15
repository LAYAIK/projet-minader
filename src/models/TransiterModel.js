export default (sequelize, DataTypes) => {
const Transiter = sequelize.define('Transiter', {
  id: { // Clé primaire pour la table de jonction
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  date_transition: {
    type: DataTypes.DATE, // Ou DataTypes.DATEONLY si seulement la date
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Clés étrangères définies via les associations dans index.js
}, {
  tableName: 'Transition_Structure',
  timestamps: true,
  underscored: true
});

return Transiter;
};