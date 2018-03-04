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
    OrderDetail.belongsTo(models.Order);
    OrderDetail.belongsTo(models.Dish);
  };

  return OrderDetail;
};
