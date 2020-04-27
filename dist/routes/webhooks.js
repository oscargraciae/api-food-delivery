'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _webhooks = require('../controllers/webhooks');

var _webhooks2 = _interopRequireDefault(_webhooks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = new _express.Router();

routes.get('/facebook/webhook', _webhooks2.default.get);
routes.post('/facebook/webhook', _webhooks2.default.setMessage);

exports.default = routes;