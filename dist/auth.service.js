'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = require('passport-jwt');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local strategy
var localOpts = {
  usernameField: 'email'
};

var localStrategy = new _passportLocal2.default(localOpts, function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(email, password, done) {
    var user, valid;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            console.log("Datos de login---->", email, password);
            _context.next = 4;
            return _models2.default.User.findOne({ where: { email: email } });

          case 4:
            user = _context.sent;

            console.log("Info de usuario--->", user);
            _context.next = 8;
            return _bcrypt2.default.compare(password, user.password);

          case 8:
            valid = _context.sent;

            if (user) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('return', done(null, false));

          case 13:
            if (valid) {
              _context.next = 15;
              break;
            }

            return _context.abrupt('return', done(null, false));

          case 15:
            return _context.abrupt('return', done(null, user));

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', done(_context.t0, false));

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 18]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

// Jwt Strategy
var jwtOpts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeader('authorization'),
  secretOrKey: 'secret'
};

var jwtStrategy = new _passportJwt.Strategy(jwtOpts, function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(payload, done) {
    var user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models2.default.User.findById(payload.id);

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', done(null, false));

          case 6:
            return _context2.abrupt('return', done(null, user));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', done(_context2.t0, false));

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 9]]);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());

_passport2.default.use(localStrategy);
_passport2.default.use(jwtStrategy);

var authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
var authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });