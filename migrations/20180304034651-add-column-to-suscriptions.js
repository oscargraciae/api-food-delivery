module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('suscriptions', 'id_conketa', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {}
};
