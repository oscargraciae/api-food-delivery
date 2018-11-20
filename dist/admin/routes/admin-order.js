'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _adminOrder = require('../controllers/admin-order');

var _adminOrder2 = _interopRequireDefault(_adminOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/', _adminOrder2.default.getOrders);
routes.get('/:id', _adminOrder2.default.getOrder);
routes.get('/:id/detail', _adminOrder2.default.getOrderDetail);
routes.get('/:date/day', _adminOrder2.default.getAll);
routes.get('/:date/group', _adminOrder2.default.getAllGroup);

exports.default = routes;