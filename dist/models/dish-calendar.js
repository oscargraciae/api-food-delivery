'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var DishCalendar = sequelize.define('dish_calendar', {
    date: DataTypes.DATE
  }, { underscored: true });

  DishCalendar.associate = function (models) {
    DishCalendar.belongsTo(models.Dish);
  };

  return DishCalendar;
};