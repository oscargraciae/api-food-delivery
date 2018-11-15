import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: {
        name: 'uniqueKey',
        msg: 'Esta dirección de correo electrónico ya está en uso. ',
      },
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Nombre obligatorio. ',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: 'Apellido obligatorio. ',
        },
      },
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    facebookId: {
      type: DataTypes.STRING,
      field: 'facebook_id',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_verified',
    },
    withAddress: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'with_address',
    },
    marketing: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'marketing',
    },
    conektaid: {
      type: DataTypes.STRING,
      field: 'conektaid',
    },
  }, {
    hooks: {
      afterValidate: async (user) => {
        if (user.password) {
          console.log("Nueva contraseña!!!!", user.password);
          // const hashedPassword = await bcrypt.hash(user.password, 12);
          const hashedPassword = await bcrypt.hashSync(user.password, 12);
          // eslint-disable-next-line no-param-reassign
          user.password = hashedPassword;
        }
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.UserAddress, { as: 'user_address' }, { foreignKey: { name: 'userId', field: 'user_id' } });
    User.belongsTo(models.Bussine, {
      foreignKey: {
        name: 'bussinesId',
        field: 'bussines_id',
      },
    });
    User.hasMany(models.Order);
    // User.hasMany(models.UserAddress, {foreignKey: 'AuthorId'})
  };

  // eslint-disable-next-line func-names
  User.prototype.toAuthJSON = function () {
    const createToken = jwt.sign(
      {
        id: this.id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        withAddress: this.withAddress,
      },
      'secret',
    );

    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      token: `${createToken}`,
      // token: `JWT ${createToken}`,
    };
  };

  return User;
};
