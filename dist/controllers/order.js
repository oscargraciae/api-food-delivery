'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var calculateItems = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data, pDiscount) {
    var dishes, total, subtotal, discount, fee, i, item, dish, totalItem, orderDetail;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dishes = [];
            total = 0;
            subtotal = 0;
            discount = 0;
            fee = 0;
            i = 0;

          case 6:
            if (!(i < data.length)) {
              _context.next = 18;
              break;
            }

            item = data[i];
            _context.next = 10;
            return _models2.default.Dish.findById(item.id);

          case 10:
            dish = _context.sent;
            totalItem = dish.price * item.quantity;
            orderDetail = {
              dishId: item.id,
              total: totalItem,
              quantity: item.quantity,
              deliveryDate: item.deliveryDate
            };

            dishes.push(orderDetail);
            subtotal += totalItem;

          case 15:
            i++;
            _context.next = 6;
            break;

          case 18:
            discount = subtotal * (pDiscount / 100);
            total = subtotal + fee - discount;
            return _context.abrupt('return', {
              total: total,
              subtotal: subtotal,
              fee: fee,
              discount: discount,
              dishes: dishes
            });

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function calculateItems(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var saveOrderDishes = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dishes, order) {
    var x, item;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            x = 0;

          case 1:
            if (!(x < dishes.length)) {
              _context2.next = 8;
              break;
            }

            item = dishes[x];
            _context2.next = 5;
            return _models2.default.OrderDetail.create((0, _extends3.default)({}, item, { orderId: order.id }));

          case 5:
            x++;
            _context2.next = 1;
            break;

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function saveOrderDishes(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var saveOrder = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(order) {
    var resp;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models2.default.Order.create((0, _extends3.default)({}, order));

          case 2:
            resp = _context3.sent;
            return _context3.abrupt('return', resp);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function saveOrder(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _conekta = require('conekta');

var _conekta2 = _interopRequireDefault(_conekta);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _consts = require('../config/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};
var Op = _sequelize2.default.Op;


function payment(data, callback) {
  // Se agrega el descuento
  var objDiscount = null;
  if (data.discount > 0) {
    objDiscount = {
      code: 'Convenio con empresa',
      type: 'loyalty',
      amount: data.discount
    };
  }

  _conekta2.default.api_key = _consts.CONEKTA_KEY;
  _conekta2.default.locale = 'es';
  _conekta2.default.Order.create({
    currency: 'MXN',
    customer_info: {
      customer_id: data.customerId
    },
    line_items: data.items,
    discount_lines: [objDiscount],
    // discount_lines: [],
    charges: [{
      payment_method: {
        type: 'card',
        payment_source_id: data.paymentSourceId
      }
    }]
  }, function (err, order) {
    if (err) {
      return callback({ ok: false, err: err });
    }

    return callback({ ok: true, order: order });
  });
}

controller.create = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    var data, user, discount, order, newDishes, creditCard;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            data = req.body;

            // consultar usuario comprador

            _context5.next = 4;
            return _models2.default.User.findOne({ where: { id: req.user.id } });

          case 4:
            user = _context5.sent;
            discount = 0;


            if (data.isDiscount) {
              discount = 20;
            }
            if (user.bussinesId) {
              discount = 20;
            }

            // Se calcula el subtotal, total de la compra por listado de productos
            _context5.next = 10;
            return calculateItems(data.orderDetails, discount);

          case 10:
            order = _context5.sent;


            // Se genera un arreglo con los objetos para registrar en conekta
            newDishes = data.orderDetails.map(function (item) {
              return { name: item.name, unit_price: Number(item.price * 100), quantity: item.quantity };
            });

            // Se consulta la tarjeta con la que se hara el pago

            _context5.next = 14;
            return _models2.default.CreditCard.findById(data.creditCardId);

          case 14:
            creditCard = _context5.sent;


            // Se registra el pago en conketa
            payment({ customerId: req.user.conektaid, items: newDishes, paymentSourceId: creditCard.token, discount: Number(order.discount * 100) }, function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(orderConekta) {
                var orderResp;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!orderConekta.ok) {
                          _context4.next = 6;
                          break;
                        }

                        _context4.next = 3;
                        return saveOrder((0, _extends3.default)({}, data, order, { userId: req.user.id, orderStatusId: 1 }));

                      case 3:
                        orderResp = _context4.sent;


                        // Se guarda el detalle de la orden (Listado de productos)
                        saveOrderDishes(order.dishes, orderResp);

                        return _context4.abrupt('return', res.json({ ok: true, orderResp: orderResp }));

                      case 6:
                        return _context4.abrupt('return', res.json({ ok: false, err: orderConekta.err }));

                      case 7:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function (_x8) {
                return _ref5.apply(this, arguments);
              };
            }());
            _context5.next = 21;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5['catch'](0);
            return _context5.abrupt('return', res.status(500).json({ ok: false, message: 'No se ha podido procesar la orden', error: _context5.t0.message }));

          case 21:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 18]]);
  }));

  return function (_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

controller.estimateOrder = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    var data, dishes, i, item, dish, orderDetail;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // Calcula el costo de la orden en base a los productos
            data = req.body;
            dishes = [];
            i = 0;

          case 3:
            if (!(i < data.length)) {
              _context6.next = 13;
              break;
            }

            item = data[i];
            _context6.next = 7;
            return _models2.default.Dish.findById(item.id);

          case 7:
            dish = _context6.sent;
            orderDetail = {
              total: dish.price * item.quantity,
              quantity: item.quantity
            };

            dishes.push(orderDetail);

          case 10:
            i++;
            _context6.next = 3;
            break;

          case 13:
            return _context6.abrupt('return', res.json(dishes));

          case 14:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

controller.getAll = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
    var orders;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models2.default.Order.findAll({
              where: { userId: req.user.id },
              include: [{ model: _models2.default.UserAddress, as: 'user_address' }],
              order: [['id', 'DESC']]
            });

          case 2:
            orders = _context7.sent;
            return _context7.abrupt('return', res.json(orders));

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

controller.getDetail = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
    var detail;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _models2.default.OrderDetail.findAll({
              where: { orderId: req.params.id },
              include: [{ model: _models2.default.Dish, as: 'dish' }]
            });

          case 2:
            detail = _context8.sent;
            return _context8.abrupt('return', res.json(detail));

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

controller.getSchedules = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
    var schedules;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _models2.default.OrderDetail.findAll({
              where: {
                deliveryDate: (0, _defineProperty3.default)({}, Op.gte, new Date(new Date() - 24 * 60 * 60 * 1000))
              },
              include: [{
                model: _models2.default.Order,
                where: { userId: req.user.id }
              }, { model: _models2.default.Dish, as: 'dish' }]
            });

          case 2:
            schedules = _context9.sent;
            return _context9.abrupt('return', res.json(schedules));

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

exports.default = controller;