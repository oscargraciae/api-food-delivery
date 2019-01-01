'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _userAddress = require('./user-address');

var _userAddress2 = _interopRequireDefault(_userAddress);

var _dish = require('./dish');

var _dish2 = _interopRequireDefault(_dish);

var _creditCards = require('./credit-cards');

var _creditCards2 = _interopRequireDefault(_creditCards);

var _order = require('./order');

var _order2 = _interopRequireDefault(_order);

var _password = require('./password');

var _password2 = _interopRequireDefault(_password);

var _adminOrder = require('../admin/routes/admin-order');

var _adminOrder2 = _interopRequireDefault(_adminOrder);

var _adminUsers = require('../admin/routes/admin-users');

var _adminUsers2 = _interopRequireDefault(_adminUsers);

var _adminData = require('../admin/routes/admin-data');

var _adminData2 = _interopRequireDefault(_adminData);

var _adminBussines = require('../admin/routes/admin-bussines');

var _adminBussines2 = _interopRequireDefault(_adminBussines);

var _adminDishes = require('../admin/routes/admin-dishes');

var _adminDishes2 = _interopRequireDefault(_adminDishes);

var _auth = require('../auth.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// admin
exports.default = function (app) {
  app.use('/api/v1/users', _user2.default);
  app.use('/api/v1/address', _userAddress2.default);
  app.use('/api/v1/dishes', _dish2.default);
  app.use('/api/v1/password', _password2.default);
  app.use('/api/v1/credit-cards', _creditCards2.default);
  app.use('/api/v1/orders', _order2.default);
  app.use('/api/v1/bussines', _adminBussines2.default);

  app.use('/api/admin/orders', _adminOrder2.default);
  app.use('/api/admin/users', _adminUsers2.default);
  app.use('/api/admin/data', _adminData2.default);
  app.use('/api/admin/bussines', _adminBussines2.default);
  app.use('/api/admin/dishes', _adminDishes2.default);
};