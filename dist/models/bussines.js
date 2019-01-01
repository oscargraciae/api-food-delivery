'use strict';

module.exports = function (sequelize, DataTypes) {
  var bussines = sequelize.define('bussines', {
    name: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    contactName: {
      type: DataTypes.STRING,
      field: 'contact_name'
    },
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    addressMap: {
      type: DataTypes.STRING,
      field: 'address_map'
    },
    street: DataTypes.STRING,
    area: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL
  }, {});
  bussines.associate = function (models) {
    // associations can be defined here
  };
  return bussines;
};