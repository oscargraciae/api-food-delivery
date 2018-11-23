'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    queryInterface.addColumn('dishes', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: true
    }).then(function () {
      queryInterface.addConstraint('dishes', ['category_id'], {
        type: 'FOREIGN KEY',
        name: 'dishes_fkey_constraint_category_id',
        references: {
          table: 'categories',
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