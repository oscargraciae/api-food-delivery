'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _conekta = require('conekta');

var _conekta2 = _interopRequireDefault(_conekta);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _consts = require('../config/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCreditCard(card, userId) {
  var cardObj = {
    token: card.id,
    last4: card.last4,
    brand: card.brand,
    userId: userId
  };
  _models2.default.CreditCard.create(cardObj);
}

var controller = {};

controller.getByUser = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var creditCards;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models2.default.CreditCard.findAll({ where: { userId: req.user.id, isActive: true }, order: [['id', 'DESC']] });

          case 2:
            creditCards = _context.sent;
            return _context.abrupt('return', res.json(creditCards));

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

controller.create = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // conekta.api_key = 'key_jaiWQwqGqEkQqqkUqhdy2A';
            _conekta2.default.api_key = _consts.CONEKTA_KEY;
            _conekta2.default.locale = 'es';

            if (req.user.conektaid) {
              _conekta2.default.Customer.find(req.user.conektaid, function (err, customer) {
                customer.createPaymentSource({ type: 'card', token_id: req.body.token }, function (err, card) {
                  if (err) {
                    return res.json(err);
                  }
                  var resp = card;
                  createCreditCard(resp, req.user.id);
                  return res.json(resp);
                });
              });
            } else {
              _conekta2.default.Customer.create({
                name: req.user.firstName + ' ' + req.user.lastName,
                email: req.user.email,
                payment_sources: [{
                  type: 'card',
                  token_id: req.body.token
                }]
              }, function () {
                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(err, resp) {
                  var customer, user;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!err) {
                            _context2.next = 2;
                            break;
                          }

                          return _context2.abrupt('return', res.json(err));

                        case 2:
                          customer = resp.toObject();
                          _context2.next = 5;
                          return _models2.default.User.findOne({ where: { id: req.user.id } });

                        case 5:
                          user = _context2.sent;

                          user.update({ conektaid: customer.id });
                          createCreditCard(customer.payment_sources.data[0], req.user.id);
                          return _context2.abrupt('return', res.json(resp.toObject()));

                        case 9:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x5, _x6) {
                  return _ref3.apply(this, arguments);
                };
              }());
            }

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = controller;