export default (sequelize, DataTypes) => {
  const Dish = sequelize.define('dish', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    availableOn: {
      type: DataTypes.STRING,
      field: 'available_on',
    },
  });

  // Dish.associate = (models) => {};
  return Dish;
};
