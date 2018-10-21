export default (sequelize, DataTypes) => {
  const DishDetail = sequelize.define('dish_detail', {
    cost: DataTypes.DECIMAL,
  }, {});

  DishDetail.associate = (models) => {
    DishDetail.belongsTo(models.Dish, {
      foreignKey: {
        name: 'dishId',
        field: 'dish_id',
      },
    });
  };

  return DishDetail;
};
