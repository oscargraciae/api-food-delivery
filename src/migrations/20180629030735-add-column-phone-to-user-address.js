'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('user_addresses', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    }).then(() => {
      queryInterface.addColumn('user_addresses', 'notes', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
