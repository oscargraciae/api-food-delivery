'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _adminUsers = require('../controllers/admin-users');

var _adminUsers2 = _interopRequireDefault(_adminUsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/', _adminUsers2.default.getAll);
routes.get('/:id', _adminUsers2.default.get);
routes.get('/delivery/date', _adminUsers2.default.getAllByDeliveryDate);
routes.get('/:id/delivery-notification', _adminUsers2.default.sendDeliveryNotification);
routes.get('/user/view', _adminUsers2.default.getOrderByUser);
exports.default = routes;