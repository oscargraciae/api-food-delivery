'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _middlewares = require('./config/middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _mocks = require('./mocks');

var _mocks2 = _interopRequireDefault(_mocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

(0, _middlewares2.default)(app);
(0, _routes2.default)(app);

var port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log('Server listen on port: ' + port);
});

// models.sequelize.sync({ alter: true }).then(() => {
//   app.listen(3001);
// });

// db.sequelize.sync({ alter: true }).then(() => {
//   app.listen(port, () => {
//     console.log(`Server listen on port: ${port}`);
//   });
// });