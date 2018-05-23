'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const sequelize = new Sequelize('eathouse_development', 'postgres', 'desarrollo', {
//   dialect: 'postgres',
//   // timezone: '',
//   define: {
//     underscored: true,
//   },
// });

var sequelize = new _sequelize2.default('eathouse', 'eathouse', 'Eathouse.001', {
  host: 'eathouse.cyzwdrnlmdwk.us-west-2.rds.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  // timezone: '-05:00',
  define: {
    underscored: true
  }
});

// const sequelize = new Sequelize('eathouse', 'eathouse', 'Eathouse.001', {
//   host: 'eathouse.cyzwdrnlmdwk.us-west-2.rds.amazonaws.com',
//   port: 5432,
//   dialect: 'postgres',
//   define: {
//     underscored: true,
//     freezeTableName: true,
//     timestamps: false,
//   },
//   dialectOptions: {
//     useUTC: false,
//     dateStrings: true,
//   },
//   timezone: '+05:00',
// });

var models = {
  CreditCard: sequelize.import('./credit-card'),
  DishCalendar: sequelize.import('./dish-calendar'),
  Dish: sequelize.import('./dish'),
  OrderDetail: sequelize.import('./order-detail'),
  OrderStatus: sequelize.import('./order-status'),
  Order: sequelize.import('./order'),
  UserAddress: sequelize.import('./user-address'),
  User: sequelize.import('./user')
};

(0, _keys2.default)(models).forEach(function (modelName) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = _sequelize2.default;

exports.default = models;