'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _openpay = require('openpay');

var _openpay2 = _interopRequireDefault(_openpay);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _consts = require('../config/consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCreditCard(card, userId) {
  try {
    var cardObj = {
      token: card.id,
      last4: card.card_number,
      brand: card.brand,
      userId: userId
    };
    _models2.default.CreditCard.create(cardObj);
  } catch (error) {
    console.log("Error----->", error);
  }
} // import conekta from 'conekta';


var controller = {};

controller.getByUser = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    var creditCards;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models2.default.CreditCard.findAll({ where: { userId: req.user.id }, order: [['id', 'DESC']] });

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
    var openpay;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            openpay = new _openpay2.default('m7pd5e0tn3gnjzam8jvc', 'sk_baecde9ba76f45d382f7827efdba0b30', false);

            if (req.user.conektaid) {
              openpay.customers.get(req.user.conektaid, function (err, customer) {
                openpay.customers.cards.create(customer.id, { token_id: req.body.token, device_session_id: req.body.deviceSessionId }, function (error, card) {
                  if (error) {
                    console.log('error---------->', error);
                    return res.json(error);
                  }
                  createCreditCard(card, req.user.id);
                  return res.json(card);
                });
              });
            } else {
              openpay.customers.create({
                name: '' + req.user.firstName,
                last_name: req.user.lastName,
                email: req.user.email
                // external_id: req.user.id,
              }, function () {
                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(err, resp) {
                  var user;
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

                          openpay.customers.cards.create(resp.id, { token_id: req.body.token, device_session_id: req.body.deviceSessionId }, function (error, card) {
                            if (error) {
                              console.log('error---------->', error);
                            } else {
                              createCreditCard(card, req.user.id);
                            }
                          });

                          _context2.next = 5;
                          return _models2.default.User.findOne({ where: { id: req.user.id } });

                        case 5:
                          user = _context2.sent;

                          user.update({ conektaid: resp.id });

                          return _context2.abrupt('return', res.json(resp));

                        case 8:
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
            _context3.next = 9;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3['catch'](0);

            console.log("Ha ocurrido un error", _context3.t0);
            return _context3.abrupt('return', res.json({ message: "Ha ocurrido un error" }));

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 5]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = controller;