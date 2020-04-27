'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _order = require('../controllers/order');

var _order2 = _interopRequireDefault(_order);

var _auth = require('../auth.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/', _auth.authJwt, _order2.default.getAll);
routes.get('/order-detail/:id', _auth.authJwt, _order2.default.getDetail);
routes.get('/schedules', _auth.authJwt, _order2.default.getSchedules);

routes.post('/', _auth.authJwt, _order2.default.create);
routes.post('/cash', _auth.authJwt, _order2.default.orderCashCreate);
routes.post('/estimate-order', _auth.authJwt, _order2.default.estimateOrder);

exports.default = routes;