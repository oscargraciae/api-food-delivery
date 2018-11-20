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

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.getGeneral = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var totalSale, totalOrdeDetails, totalOrdes, totalUsers;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models2.default.Order.sum('total');

          case 2:
            totalSale = _context.sent;
            _context.next = 5;
            return _models2.default.OrderDetail.count();

          case 5:
            totalOrdeDetails = _context.sent;
            _context.next = 8;
            return _models2.default.Order.count();

          case 8:
            totalOrdes = _context.sent;
            _context.next = 11;
            return _models2.default.User.count();

          case 11:
            totalUsers = _context.sent;
            return _context.abrupt('return', res.json({ data: { totalSale: totalSale, totalUsers: totalUsers, totalOrdes: totalOrdes, totalOrdeDetails: totalOrdeDetails } }));

          case 13:
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

controller.getUserByMonth = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _ref3, _ref4, data;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models2.default.sequelize.query('\n    SELECT to_char(created_at, \'YYYY-MM\') as month, count(created_at) as total_count\n    FROM users\n    GROUP BY to_char(created_at, \'YYYY-MM\')\n    ORDER BY to_char(created_at, \'YYYY-MM\') asc\n  ', { raw: true });

          case 2:
            _ref3 = _context2.sent;
            _ref4 = (0, _slicedToArray3.default)(_ref3, 1);
            data = _ref4[0];
            return _context2.abrupt('return', res.json(data));

          case 6:
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

controller.getOrdersByMonth = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    var _ref6, _ref7, data;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models2.default.sequelize.query('\n    SELECT to_char(created_at, \'YYYY-MM\') as month, count(created_at) as total_count\n    FROM orders\n    GROUP BY to_char(created_at, \'YYYY-MM\')\n    ORDER BY to_char(created_at, \'YYYY-MM\') asc\n  ', { raw: true });

          case 2:
            _ref6 = _context3.sent;
            _ref7 = (0, _slicedToArray3.default)(_ref6, 1);
            data = _ref7[0];
            return _context3.abrupt('return', res.json(data));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

controller.getOrderDetailsByMonth = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
    var _ref9, _ref10, data;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models2.default.sequelize.query('\n    SELECT to_char(created_at, \'YYYY-MM\') as month, sum(quantity) as total_count\n    FROM order_details\n    GROUP BY to_char(created_at, \'YYYY-MM\')\n    ORDER BY to_char(created_at, \'YYYY-MM\') asc\n  ', { raw: true });

          case 2:
            _ref9 = _context4.sent;
            _ref10 = (0, _slicedToArray3.default)(_ref9, 1);
            data = _ref10[0];
            return _context4.abrupt('return', res.json(data));

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

controller.getOrderTotalByMonth = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var _ref12, _ref13, data;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models2.default.sequelize.query('\n    SELECT to_char(created_at, \'YYYY-MM\') as month, sum(total) as total_count\n    FROM order_details\n    GROUP BY to_char(created_at, \'YYYY-MM\')\n    ORDER BY to_char(created_at, \'YYYY-MM\') asc\n  ', { raw: true });

          case 2:
            _ref12 = _context5.sent;
            _ref13 = (0, _slicedToArray3.default)(_ref12, 1);
            data = _ref13[0];
            return _context5.abrupt('return', res.json(data));

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref11.apply(this, arguments);
  };
}();

controller.getProfitByProduct = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    var _ref15, _ref16, data;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _models2.default.sequelize.query('\n    SELECT order_details.dish_id, dishes.name,\n      SUM(order_details.quantity),\n      SUM(total) as sale,\n      SUM(dish_details.cost * order_details.quantity) as expense,\n      SUM(total - (dish_details.cost * order_details.quantity)) as revenue\n    FROM order_details\n    INNER JOIN dishes ON dishes.id = order_details.dish_id\n    INNER JOIN dish_details ON dish_details.dish_id = order_details.dish_id\n    WHERE EXTRACT(MONTH FROM order_details.created_at) = (SELECT EXTRACT(month FROM CURRENT_DATE))\n    GROUP BY order_details.dish_id, dishes.name\n    ORDER BY sale DESC\n  ');

          case 2:
            _ref15 = _context6.sent;
            _ref16 = (0, _slicedToArray3.default)(_ref15, 1);
            data = _ref16[0];
            return _context6.abrupt('return', res.json(data));

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x11, _x12) {
    return _ref14.apply(this, arguments);
  };
}();

controller.getProfitByMonth = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    var _ref18, _ref19, data;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models2.default.sequelize.query('\n    SELECT\n      to_char(created_at, \'YYYY-MM\') as month,\n      SUM(order_details.quantity),\n      SUM(total) as sale,\n        SUM(dish_details.cost * order_details.quantity) as expense,\n        SUM(total - (dish_details.cost * order_details.quantity)) as revenue\n    FROM order_details\n    INNER JOIN dish_details ON dish_details.dish_id = order_details.dish_id\n    GROUP BY to_char(created_at, \'YYYY-MM\')\n    ORDER BY to_char(created_at, \'YYYY-MM\') DESC\n\n  ');

          case 2:
            _ref18 = _context7.sent;
            _ref19 = (0, _slicedToArray3.default)(_ref18, 1);
            data = _ref19[0];
            return _context7.abrupt('return', res.json(data));

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x13, _x14) {
    return _ref17.apply(this, arguments);
  };
}();

exports.default = controller;