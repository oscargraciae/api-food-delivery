'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _dish = require('../controllers/dish');

var _dish2 = _interopRequireDefault(_dish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/', _dish2.default.getAll);
routes.get('/:id', _dish2.default.get);

exports.default = routes;