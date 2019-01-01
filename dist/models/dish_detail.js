'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var DishDetail = sequelize.define('dish_detail', {
    cost: DataTypes.DECIMAL
  }, {});

  DishDetail.associate = function (models) {
    DishDetail.belongsTo(models.Dish, {
      foreignKey: {
        name: 'dishId',
        field: 'dish_id'
      }
    });
  };

  return DishDetail;
};