'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../auth.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

// user routes
routes.get('/:id', _auth.authJwt, _user2.default.get);
routes.post('/login-facebook', _auth.authFacebook, _user2.default.loginFacebook);
routes.post('/login', _auth.authLocal, _user2.default.login);
routes.post('/signup', _user2.default.create);
routes.post('/address', _auth.authJwt, _user2.default.createAddress);
routes.post('/link-business', _auth.authJwt, _user2.default.createAddressWithBusiness);
routes.post('/send-password-email', _user2.default.sendPasswordReset);

exports.default = routes;