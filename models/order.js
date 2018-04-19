export default (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    subtotal: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    fee: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
  }, { underscored: true });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
    Order.belongsTo(models.CreditCard, {
      foreignKey: {
        name: 'creditCardId',
        field: 'credit_cart_id',
      },
    });
    Order.belongsTo(models.UserAddress, {
      foreignKey: {
        name: 'userAddressId',
        field: 'user_address_id',
      },
    });
    Order.belongsTo(models.OrderStatus, {
      foreignKey: {
        name: 'orderStatusId',
        field: 'order_status_id',
      },
    });
  };

  return Order;
};
