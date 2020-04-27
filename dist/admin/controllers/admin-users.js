'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _sendSms = require('../../utils/send-sms');

var _sendSms2 = _interopRequireDefault(_sendSms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.get = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models2.default.User.findOne({
              where: { id: req.params.id },
              include: [{ model: _models2.default.UserAddress, as: 'user_address' }]
            });

          case 2:
            user = _context.sent;
            return _context.abrupt('return', res.json(user));

          case 4:
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

controller.getAll = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var users;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models2.default.User.findAll({
              order: [['id', 'DESC']],
              include: [{ model: _models2.default.UserAddress, as: 'user_address' }]
            });

          case 2:
            users = _context2.sent;
            return _context2.abrupt('return', res.json(users));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Metodo de usuarios por fecha entrega
controller.getAllByDeliveryDate = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var d, de, _ref4, _ref5, data;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            d = new Date().toISOString().slice(0, 19).replace('T', ' ');
            de = new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

            // const [data] = await models.sequelize.query(
            //   `
            //   select DISTINCT users.id, users.* from users
            //   inner join orders on users.id = orders.user_id
            //   inner join order_details on orders.id = order_details.order_id
            //   WHERE order_details.delivery_date < '${d}' AND order_details.delivery_date >= '${de}'
            // `,
            //   { raw: true },
            // );

            _context3.next = 4;
            return _models2.default.sequelize.query('\n    select DISTINCT users.id, users.*, user_addresses.*, orders.id as order_id from users\n    inner join orders on users.id = orders.user_id\n    inner join user_addresses on user_addresses.id = orders.user_address_id\n    inner join order_details on order_details.order_id = (select order_id from order_details where orders.id = order_details.order_id limit 1)\n    WHERE order_details.delivery_date < \'' + d + '\' AND order_details.delivery_date >= \'' + de + '\'\n\n  ', { raw: true });

          case 4:
            _ref4 = _context3.sent;
            _ref5 = (0, _slicedToArray3.default)(_ref4, 1);
            data = _ref5[0];
            return _context3.abrupt('return', res.json(data));

          case 8:
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

controller.sendDeliveryNotification = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var id, order, address, message, phone;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _models2.default.Order.findOne({ where: { id: id } });

          case 3:
            order = _context4.sent;
            _context4.next = 6;
            return _models2.default.UserAddress.findOne({ where: { id: order.userAddressId } });

          case 6:
            address = _context4.sent;
            message = 'Eathouse: Hola, tu orden va en camino, ¡buen provecho!';
            // const phone = '8123203436';

            phone = address.phone;

            (0, _sendSms2.default)(message, phone);
            return _context4.abrupt('return', res.json({ message: 'Notificacíon enviada' }));

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

controller.getOrderByUser = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var d, de, orders;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            d = new Date().toISOString().slice(0, 19).replace('T', ' ');
            de = new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
            _context5.next = 4;
            return _models2.default.User.findAll({
              where: {
                '$orders.order_details.delivery_date$': {
                  lt: d,
                  gte: de
                }
              },
              include: [{
                model: _models2.default.Order,
                as: 'orders',
                include: [{ model: _models2.default.UserAddress, as: 'user_address' }, {
                  model: _models2.default.OrderDetail,
                  as: 'order_details',
                  include: [{ model: _models2.default.Dish }]
                }]
              }]
            });

          case 4:
            orders = _context5.sent;
            return _context5.abrupt('return', res.json(orders));

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

exports.default = controller;