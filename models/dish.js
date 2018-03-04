export default (sequelize, DataTypes) => {
  const Dish = sequelize.define('dish', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    availableOn: DataTypes.STRING,
  });

  // Dish.associate = (models) => {};
  return Dish;
};
