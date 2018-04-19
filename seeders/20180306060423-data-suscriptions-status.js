'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return Promise.all([
    //   queryInterface.bulkInsert('suscriptions_statuses', [{ name: 'Activa', createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()) }], {}),
    //   queryInterface.bulkInsert('suscriptions_statuses', [{ name: 'Pausada', createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()) }], {}),
    //   queryInterface.bulkInsert('suscriptions_statuses', [{ name: 'Cancelada', createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()) }], {}),
    // ]);
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
