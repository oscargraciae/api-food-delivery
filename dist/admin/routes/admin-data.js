'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _adminData = require('../controllers/admin-data');

var _adminData2 = _interopRequireDefault(_adminData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/general', _adminData2.default.getGeneral);
routes.get('/users-month', _adminData2.default.getUserByMonth);
routes.get('/orders-month', _adminData2.default.getOrdersByMonth);
routes.get('/order-details-month', _adminData2.default.getOrderDetailsByMonth);
routes.get('/order-total-month', _adminData2.default.getOrderTotalByMonth);
routes.get('/sales-dishes', _adminData2.default.getProfitByProduct);
routes.get('/profit-month', _adminData2.default.getProfitByMonth);
routes.get('/generate-sheet', _adminData2.default.setDataSheets);

exports.default = routes;