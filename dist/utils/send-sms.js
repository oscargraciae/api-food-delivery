'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _twilio = require('twilio');

var _twilio2 = _interopRequireDefault(_twilio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (message, phone) {
  var accountSid = 'AC8d936b8298b25c1820624a58f0b67466'; // Your Account SID from www.twilio.com/console
  var authToken = 'ee5404c1235be5117b91bb2919f87249'; // Your Auth Token from www.twilio.com/console

  var client = new _twilio2.default(accountSid, authToken);

  client.messages.create({
    body: message,
    to: '+52' + phone,
    from: '+18326267620'
  }).then(function (message) {
    return console.log("Respuesta de twilio", message.sid);
  });
};