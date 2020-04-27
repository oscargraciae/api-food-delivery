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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.getOrders = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var orders;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models2.default.Order.findAll({
              include: [{ model: _models2.default.UserAddress, as: 'user_address' }, { model: _models2.default.User }],
              order: [['id', 'DESC']]
            });

          case 2:
            orders = _context.sent;
            return _context.abrupt('return', res.json(orders));

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

controller.getOrder = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var orders;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models2.default.Order.findOne({
              where: { id: req.params.id },
              include: [{ model: _models2.default.UserAddress, as: 'user_address' }, { model: _models2.default.User }],
              order: [['id', 'DESC']]
            });

          case 2:
            orders = _context2.sent;
            return _context2.abrupt('return', res.json(orders));

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

controller.getOrderDetail = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var detail;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models2.default.OrderDetail.findAll({
              where: { orderId: req.params.id },
              include: [{ model: _models2.default.Dish, as: 'dish' }]
            });

          case 2:
            detail = _context3.sent;
            return _context3.abrupt('return', res.json(detail));

          case 4:
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

controller.getAll = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var date, yesterday, orders;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            date = req.params.date;
            yesterday = (0, _moment2.default)(date).add(1, 'days');
            _context4.next = 4;
            return _models2.default.OrderDetail.findAll({
              where: {
                deliveryDate: {
                  lt: Date.parse(yesterday),
                  gte: Date.parse(date)
                }
              },
              include: [{ model: _models2.default.Order, include: [_models2.default.User] }, { model: _models2.default.Dish, as: 'dish' }]
            });

          case 4:
            orders = _context4.sent;
            return _context4.abrupt('return', res.json(orders));

          case 6:
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

controller.getAllGroup = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var date, d, de, _ref6, _ref7, data;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            date = req.params.date;
            // const d = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
            // const de = new Date(new Date().setDate(new Date(date).getDate() + 1)).toISOString().slice(0, 19).replace('T', ' ');

            d = new Date().toISOString().slice(0, 19).replace('T', ' ');
            de = new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
            _context5.next = 5;
            return _models2.default.sequelize.query('\n    SELECT order_details.dish_id, dishes.name, SUM(order_details.quantity)\n    FROM order_details\n    INNER JOIN dishes ON dishes.id = dish_id\n    WHERE order_details.delivery_date < \'' + d + '\' AND order_details.delivery_date >= \'' + de + '\'\n    GROUP BY dish_id, dishes.name\n    ORDER BY sum desc\n  ');

          case 5:
            _ref6 = _context5.sent;
            _ref7 = (0, _slicedToArray3.default)(_ref6, 1);
            data = _ref7[0];
            return _context5.abrupt('return', res.json(data));

          case 9:
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

// WHERE order_details.delivery_date > '${d}' AND order_details.delivery_date <= '${de}'

exports.default = controller;