'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _adminBussines = require('../controllers/admin-bussines');

var _adminBussines2 = _interopRequireDefault(_adminBussines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/', _adminBussines2.default.getAll);

exports.default = routes;