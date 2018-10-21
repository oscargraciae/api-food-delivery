'use strict';
module.exports = (sequelize, DataTypes) => {
  const DishDetail = sequelize.define('DishDetail', {
    cost: DataTypes.DECIMAL
  }, {});
  DishDetail.associate = function(models) {
    // associations can be defined here
  };
  return DishDetail;
};