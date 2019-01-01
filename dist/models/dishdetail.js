'use strict';

module.exports = function (sequelize, DataTypes) {
  var DishDetail = sequelize.define('DishDetail', {
    cost: DataTypes.DECIMAL
  }, {});
  DishDetail.associate = function (models) {
    // associations can be defined here
  };
  return DishDetail;
};