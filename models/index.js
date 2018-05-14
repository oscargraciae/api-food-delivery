import Sequelize from 'sequelize';

// const sequelize = new Sequelize('eathouse_development', 'postgres', 'desarrollo', {
//   dialect: 'postgres',
//   // timezone: '',
//   define: {
//     underscored: true,
//   },
// });

const sequelize = new Sequelize('eathouse', 'eathouse', 'Eathouse.001', {
  host: 'eathouse.cyzwdrnlmdwk.us-west-2.rds.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  // timezone: '',
  define: {
    underscored: true,
  },
});

const models = {
  CreditCard: sequelize.import('./credit-card'),
  DishCalendar: sequelize.import('./dish-calendar'),
  Dish: sequelize.import('./dish'),
  OrderDetail: sequelize.import('./order-detail'),
  OrderStatus: sequelize.import('./order-status'),
  Order: sequelize.import('./order'),
  UserAddress: sequelize.import('./user-address'),
  User: sequelize.import('./user'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
