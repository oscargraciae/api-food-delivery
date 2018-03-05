export default (sequelize, DataTypes) => {
  const Suscription = sequelize.define('suscription', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    idConketa: {
      type: DataTypes.INTEGER,
      field: 'id_conketa',
    },
  }, {});

  return Suscription;
};
