'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return _promise2.default.all([queryInterface.bulkInsert('order_statuses', [{ name: 'Pendiente', created_at: new Date(Date.now()), updated_at: new Date(Date.now()) }], {}), queryInterface.bulkInsert('order_statuses', [{ name: 'Entregado', created_at: new Date(Date.now()), updated_at: new Date(Date.now()) }], {}), queryInterface.bulkInsert('order_statuses', [{ name: 'Cancelado', created_at: new Date(Date.now()), updated_at: new Date(Date.now()) }], {})]);
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};