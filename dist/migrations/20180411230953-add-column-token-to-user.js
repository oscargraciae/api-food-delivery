'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'conektaid', {
      type: Sequelize.STRING,
      allowNull: true
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