'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var OrderDetail = sequelize.define('order_detail', {
    quantity: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    deliveryDate: {
      type: DataTypes.DATE,
      field: 'delivery_date'
    }
  }, { underscored: true });

  OrderDetail.associate = function (models) {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: {
        name: 'orderId',
        field: 'order_id'
      }
    });
    OrderDetail.belongsTo(models.Dish, {
      foreignKey: {
        name: 'dishId',
        field: 'dish_id'
      }
    });
  };

  return OrderDetail;
};