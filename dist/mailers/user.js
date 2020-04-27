'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailResetPassword = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var mailResetPassword = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
    var hashedEmail, msg;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _mail2.default.setApiKey('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');

            _context.next = 3;
            return _bcryptjs2.default.hash(user.email, 12);

          case 3:
            hashedEmail = _context.sent;
            msg = {
              to: user.email,
              from: 'Eathouse <hello@eathouse.mx>',
              subject: 'Nueva contraseña',
              text: 'and easy to do anywhere, even with Node.js',
              html: '<strong>and easy to do anywhere, even with Node.js</strong>',
              templateId: '1826a31f-90ae-4263-bba5-3e67c4d3bc4c',
              substitutions: {
                name: 'Some One',
                url: 'https://eathouse.mx/password-reset?t=' + hashedEmail + '&id=' + user.id
              }
            };


            _mail2.default.setSubstitutionWrappers('=', '=');

            _mail2.default.send(msg);

            return _context.abrupt('return', "Mensaje de prueba" + hashedEmail);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function mailResetPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _mail = require('@sendgrid/mail');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.mailResetPassword = mailResetPassword;