'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'bussines_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    }).then(function () {
      queryInterface.addConstraint('users', ['bussines_id'], {
        type: 'FOREIGN KEY',
        name: 'users_fkey_constraint_bussines_id',
        references: {
          table: 'bussines',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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