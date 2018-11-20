'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: {
        name: 'uniqueKey',
        msg: 'Esta dirección de correo electrónico ya está en uso. '
      }
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Nombre obligatorio. '
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Apellido obligatorio. '
        }
      }
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    facebookId: {
      type: DataTypes.STRING,
      field: 'facebook_id'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_verified'
    },
    withAddress: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'with_address'
    },
    marketing: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'marketing'
    },
    conektaid: {
      type: DataTypes.STRING,
      field: 'conektaid'
    }
  }, {
    hooks: {
      afterValidate: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
          var hashedPassword;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!user.password) {
                    _context.next = 6;
                    break;
                  }

                  console.log("Nueva contraseña!!!!", user.password);
                  // const hashedPassword = await bcrypt.hash(user.password, 12);
                  _context.next = 4;
                  return _bcrypt2.default.hashSync(user.password, 12);

                case 4:
                  hashedPassword = _context.sent;

                  // eslint-disable-next-line no-param-reassign
                  user.password = hashedPassword;

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function afterValidate(_x) {
          return _ref.apply(this, arguments);
        };
      }()
    }
  });

  User.associate = function (models) {
    User.hasMany(models.UserAddress, { as: 'user_address' }, { foreignKey: { name: 'userId', field: 'user_id' } });
    User.belongsTo(models.Bussine, {
      foreignKey: {
        name: 'bussinesId',
        field: 'bussines_id'
      }
    });
    User.hasMany(models.Order);
    // User.hasMany(models.UserAddress, {foreignKey: 'AuthorId'})
  };

  // eslint-disable-next-line func-names
  User.prototype.toAuthJSON = function () {
    var createToken = _jsonwebtoken2.default.sign({
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      withAddress: this.withAddress
    }, 'secret');

    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      token: '' + createToken
      // token: `JWT ${createToken}`,
    };
  };

  return User;
};