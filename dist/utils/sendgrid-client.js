'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addContactToList = exports.test = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _client = require('@sendgrid/client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test() {
  _client2.default.setApiKey('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');
  _client2.default.setDefaultRequest('baseUrl', 'https://api.sendgrid.com/');
  var request = { method: 'GET', url: '/v3/contactdb/lists' };

  _client2.default.request(request).then(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        response = _ref2[0],
        body = _ref2[1];

    console.log(response.statusCode);
    console.log(body);
  });
} // const client = require('@sendgrid/client');


function addContactToList(user) {
  _client2.default.setApiKey('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');
  _client2.default.setDefaultRequest('baseUrl', 'https://api.sendgrid.com/');

  _client2.default.request({ method: 'POST', url: '/v3/contactdb/recipients', body: [{ email: user.email, first_name: user.firstName, last_name: user.lastName }] }).then(function (_ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
        response = _ref4[0],
        body = _ref4[1];

    var res = body.persisted_recipients;
    for (var i = 0; i < res.length; i++) {
      var recipientId = res[i];
      console.log("Reciienteid----->", recipientId);
      _client2.default.request({ method: 'POST', url: '/v3//contactdb/lists/3864916/recipients/' + recipientId });
    }

    console.log(response.statusCode);
    console.log(body);

    return body;
  });
}

exports.test = test;
exports.addContactToList = addContactToList;