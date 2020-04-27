'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = exports.authFacebook = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportFacebookToken = require('passport-facebook-token');

var _passportFacebookToken2 = _interopRequireDefault(_passportFacebookToken);

var _passportJwt = require('passport-jwt');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Local strategy

// import FacebookStrategy from 'passport-facebook';
var localOpts = {
  usernameField: 'email'
};

var localStrategy = new _passportLocal2.default(localOpts, function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(email, password, done) {
    var user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models2.default.User.findOne({ where: { email: email } });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', done(null, false));

          case 8:
            _context.next = 10;
            return _bcryptjs2.default.compare(password, user.password);

          case 10:
            if (_context.sent) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', done(null, false));

          case 12:
            return _context.abrupt('return', done(null, user));

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', done(_context.t0, false));

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

var facebookParams = {
  clientID: '244527906154813',
  clientSecret: '5c211931e103db0ddf2cff33f909a246'
  // callbackURL: 'http://localhost:3001/auth/facebook/callback',
};

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
_passport2.default.use('facebookToken', new _passportFacebookToken2.default(facebookParams, function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(accessToken, refreshToken, profile, done) {
    var user;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models2.default.User.findOne({ where: { facebookId: profile.id } });

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return _models2.default.User.create({
              facebookId: profile.id,
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName
            });

          case 7:
            user = _context3.sent;

          case 8:
            return _context3.abrupt('return', done(null, user));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', done(_context3.t0, false));

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 11]]);
  }));

  return function (_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}()));

var authFacebook = exports.authFacebook = _passport2.default.authenticate('facebookToken', { session: false });
var authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
var authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });