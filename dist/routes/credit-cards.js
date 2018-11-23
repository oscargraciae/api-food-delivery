'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _creditCard = require('../controllers/credit-card');

var _creditCard2 = _interopRequireDefault(_creditCard);

var _auth = require('../auth.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/', _auth.authJwt, _creditCard2.default.getByUser);
routes.post('/', _auth.authJwt, _creditCard2.default.create);

exports.default = routes;