import Sequelize from 'sequelize';

import constants from '../config/constants';

const sequelize = new Sequelize(constants.DATABASE, constants.USERNAME, constants.PASSWORD, {
  host: constants.HOST,
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const models = {
  Store: sequelize.import('./store'),
  CreditCard: sequelize.import('./credit-card'),
  Product: sequelize.import('./product'),
  OrderDetail: sequelize.import('./order-detail'),
  OrderStatus: sequelize.import('./order-status'),
  Order: sequelize.import('./order'),
  UserAddress: sequelize.import('./user-address'),
  User: sequelize.import('./user'),
  UnidType: sequelize.import('./unid_type'),
  Category: sequelize.import('./category'),
  ProductPrice: sequelize.import('./product_price'),
  StoreUser: sequelize.import('./store_user'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
