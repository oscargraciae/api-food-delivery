'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('order_statuses', [{ name: 'Pendiente', created_at: new Date(Date.now()), updated_at: new Date(Date.now()) }], {}),
      queryInterface.bulkInsert('order_statuses', [{ name: 'Entregado', created_at: new Date(Date.now()), updated_at: new Date(Date.now()) }], {}),
      queryInterface.bulkInsert('order_statuses', [{ name: 'Cancelado', created_at: new Date(Date.now()), updated_at: new Date(Date.now()) }], {}),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
