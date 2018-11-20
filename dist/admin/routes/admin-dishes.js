'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _adminDishes = require('../controllers/admin-dishes');

var _adminDishes2 = _interopRequireDefault(_adminDishes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/', _adminDishes2.default.getAll);

exports.default = routes;