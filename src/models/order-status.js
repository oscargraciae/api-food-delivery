export default (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define('order_status', {
    name: DataTypes.STRING,
  }, { underscored: true });

  return OrderStatus;
};
