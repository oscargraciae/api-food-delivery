'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Order = sequelize.define('order', {
    subtotal: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    total: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    fee: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    discount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    deviceType: {
      type: DataTypes.STRING,
      field: 'device_type'
    },
    paymentMethod: {
      type: DataTypes.INTEGER,
      field: 'payment_method'
    },
    paymentChange: {
      type: DataTypes.INTEGER,
      field: 'payment_change'
    }
  }, { underscored: true });

  Order.associate = function (models) {
    // User.hasMany(models.UserAddress, { as: 'userAddress' }, { foreignKey: { name: 'userId', field: 'user_id' } });
    Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
    Order.belongsTo(models.CreditCard, {
      foreignKey: {
        name: 'creditCardId',
        field: 'credit_cart_id'
      }
    });
    Order.belongsTo(models.UserAddress, {
      foreignKey: {
        name: 'userAddressId',
        field: 'user_address_id'
      }
    });
    Order.belongsTo(models.OrderStatus, {
      foreignKey: {
        name: 'orderStatusId',
        field: 'order_status_id'
      }
    });
    Order.hasMany(models.OrderDetail);
  };

  return Order;
};