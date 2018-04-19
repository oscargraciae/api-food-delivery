export default (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('order_detail', {
    quantity: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    deliveryDate: {
      type: DataTypes.DATE,
      field: 'delivery_date',
    },
  }, { underscored: true });

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: {
        name: 'orderId',
        field: 'order_id',
      },
    });
    OrderDetail.belongsTo(models.Dish, {
      foreignKey: {
        name: 'dishId',
        field: 'dish_id',
      },
    });
  };

  return OrderDetail;
};
