'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('credit_cards', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    }).then(function () {
      queryInterface.addConstraint('credit_cards', ['user_id'], {
        type: 'FOREIGN KEY',
        name: 'credit_cards_fkey_constraint_user_id',
        references: {
          table: 'users',
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