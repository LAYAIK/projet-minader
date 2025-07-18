import pkg from 'joi';
const { date } = pkg;

export default (sequelize, DataTypes) => {
  const CourrierUtilisateur = sequelize.define('CourrierUtilisateur', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    date_transmission: {
      type: DataTypes.DATE,
      allowNull: true
    }, 
    date_reception: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_traitement: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Courriers_Utilisateurs',
    timestamps: false
  });

  return CourrierUtilisateur;
};
