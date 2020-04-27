'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('orders', 'payment_method', {
      type: Sequelize.INTEGER,
      allowNull: true
    }).then(function () {
      queryInterface.addColumn('orders', 'payment_change', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
    });
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.dropTable('users');
    */
  }
};