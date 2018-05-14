'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.get = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var id, user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 3;
            return _models2.default.User.findOne({
              where: { id: id },
              include: [{ model: _models2.default.UserAddress, as: 'user_address' }]
            });

          case 3:
            user = _context.sent;
            return _context.abrupt('return', res.json(user));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

controller.login = function (req, res, next) {
  res.status(200).json({
    ok: true,
    user: req.user.toAuthJSON()
  });
  return next();
};

controller.create = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models2.default.User.create(req.body);

          case 3:
            user = _context2.sent;
            return _context2.abrupt('return', res.status(201).json({
              ok: true,
              user: user
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', res.json({
              ok: false,
              errors: _context2.t0.message
            }));

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

controller.createAddress = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var data, address, user;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            data = req.body;
            _context3.next = 4;
            return _models2.default.UserAddress.create((0, _extends3.default)({}, data, { userId: req.user.id }));

          case 4:
            address = _context3.sent;

            if (!address) {
              _context3.next = 10;
              break;
            }

            _context3.next = 8;
            return _models2.default.User.findOne({
              where: { id: req.user.id }
            });

          case 8:
            user = _context3.sent;

            user.update({ withAddress: true });

          case 10:
            return _context3.abrupt('return', res.json({
              ok: true,
              address: address
            }));

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', res.status(500).json({
              ok: false,
              error: _context3.t0
            }));

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 13]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = controller;