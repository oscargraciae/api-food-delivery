'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var OrderStatus = sequelize.define('order_status', {
    name: DataTypes.STRING
  }, { underscored: true });

  return OrderStatus;
};