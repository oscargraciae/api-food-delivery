'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('suscriptions', [{ name: '3 Comidas por semana', price: 199, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()) }], {}),
      queryInterface.bulkInsert('suscriptions', [{ name: '5 Comidas por semana', price: 299, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()) }], {}),
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
