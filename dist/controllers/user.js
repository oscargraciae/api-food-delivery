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

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _sendgridClient = require('../utils/sendgrid-client');

var _user = require('../mailers/user');

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
              include: [{ model: _models2.default.UserAddress, as: 'user_address' }, { model: _models2.default.Bussine }]
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

controller.loginFacebook = function (req, res, next) {
  console.log("Test FACEBOOK---->");
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

            if (!user) {
              _context2.next = 7;
              break;
            }

            _context2.next = 7;
            return (0, _sendgridClient.addContactToList)(user);

          case 7:
            return _context2.abrupt('return', res.status(201).json({
              ok: true,
              user: user
            }));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', res.json({
              ok: false,
              errors: _context2.t0.message
            }));

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 10]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

controller.sendPasswordReset = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var email, user, message;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = req.body.email;
            _context3.next = 3;
            return _models2.default.User.findOne({ where: { email: email } });

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt('return', res.json({ message: 'Usuario no encontrado' }));

          case 6:
            _context3.next = 8;
            return (0, _user.mailResetPassword)(user);

          case 8:
            message = _context3.sent;
            return _context3.abrupt('return', res.json({ message: 'Correo enviado', prueba: message }));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

controller.validationToken = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var _req$query, t, id, user;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$query = req.query, t = _req$query.t, id = _req$query.id;
            _context4.next = 3;
            return _models2.default.User.findOne({ where: { id: id } });

          case 3:
            user = _context4.sent;
            _context4.next = 6;
            return _bcrypt2.default.compare(user.email, t);

          case 6:
            if (_context4.sent) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt('return', res.json({ isValid: false, message: 'Usuario invalido' }));

          case 8:
            return _context4.abrupt('return', res.json({ message: 'Usuario valido', isValid: true, userId: user.id }));

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

controller.changePassword = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var id, us;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _models2.default.User.update({ password: req.body.newPassword }, { where: { id: id } });

          case 3:
            us = _context5.sent;
            return _context5.abrupt('return', res.json({ message: 'Usuario valido', userId: us, ok: true }));

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

controller.createAddress = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    var data, address, user;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            data = req.body;
            _context6.next = 4;
            return _models2.default.UserAddress.create((0, _extends3.default)({}, data, { userId: req.user.id }));

          case 4:
            address = _context6.sent;

            if (!address) {
              _context6.next = 10;
              break;
            }

            _context6.next = 8;
            return _models2.default.User.findOne({
              where: { id: req.user.id }
            });

          case 8:
            user = _context6.sent;

            user.update({ withAddress: true });

          case 10:
            return _context6.abrupt('return', res.json({
              ok: true,
              address: address
            }));

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6['catch'](0);
            return _context6.abrupt('return', res.status(500).json({
              ok: false,
              error: _context6.t0
            }));

          case 16:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 13]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

controller.createAddressWithBusiness = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    var data, business, address, user;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            data = req.body;
            _context7.next = 4;
            return _models2.default.Bussine.findOne({ where: { id: data.businessId } });

          case 4:
            business = _context7.sent;
            _context7.next = 7;
            return _models2.default.UserAddress.create({
              addressMap: business.addressMap,
              street: business.street,
              area: business.area,
              lat: business.lat,
              lng: business.lng,
              city: business.city,
              state: business.state,
              phone: data.phone,
              notes: data.notes,
              userId: req.user.id
            });

          case 7:
            address = _context7.sent;

            if (!address) {
              _context7.next = 13;
              break;
            }

            _context7.next = 11;
            return _models2.default.User.findOne({ where: { id: req.user.id } });

          case 11:
            user = _context7.sent;

            user.update({ withAddress: true, bussinesId: business.id });

          case 13:
            return _context7.abrupt('return', res.json({
              ok: true,
              address: address
            }));

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7['catch'](0);
            return _context7.abrupt('return', res.status(500).json({
              ok: false,
              error: _context7.t0
            }));

          case 19:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 16]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.default = controller;