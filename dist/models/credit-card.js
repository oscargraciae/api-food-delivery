'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var CreditCard = sequelize.define('credit_card', {
    token: DataTypes.STRING,
    last4: DataTypes.STRING,
    brand: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, { underscored: true });

  CreditCard.associate = function (models) {
    CreditCard.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };

  return CreditCard;
};