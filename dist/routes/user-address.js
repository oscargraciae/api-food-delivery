'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _userAddress = require('../controllers/user-address');

var _userAddress2 = _interopRequireDefault(_userAddress);

var _auth = require('../auth.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

// address routes
routes.get('/', _auth.authJwt, _userAddress2.default.getAddress);

exports.default = routes;