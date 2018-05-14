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

var _auth = require('../auth.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use('/api/v1/users', _user2.default);
  app.use('/api/v1/address', _userAddress2.default);
  app.use('/api/v1/dishes', _dish2.default);
  app.use('/api/v1/credit-cards', _creditCards2.default);
  app.use('/api/v1/orders', _order2.default);
};