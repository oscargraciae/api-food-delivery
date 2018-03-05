module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'suscription_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    }).then(() => {
      queryInterface.addConstraint('users', ['suscription_id'], {
        type: 'FOREIGN KEY',
        name: 'users_fkey_constraint_suscription_id',
        references: {
          table: 'suscriptions',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
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
