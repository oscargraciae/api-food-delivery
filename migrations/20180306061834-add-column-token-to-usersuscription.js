module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('user_suscriptions', 'token_suscription', {
      type: Sequelize.INTEGER,
      allowNull: true,
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
