export default (sequelize, DataTypes) => {
  const Dish = sequelize.define('dish', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN,
    availableOn: {
      type: DataTypes.STRING,
      field: 'available_on',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
    },
  });

  // Dish.associate = (models) => {};
  return Dish;
};
