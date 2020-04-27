import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default (sequelize, DataTypes) => {
  const StoreUser = sequelize.define('store_users', {
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
  }, {
    hooks: {
      afterValidate: async (user) => {
        if (user.password) {
          const hashedPassword = await bcrypt.hashSync(user.password, 12);
          user.password = hashedPassword;
        }
      },
    },
  });

  StoreUser.associate = (models) => {
    StoreUser.belongsTo(models.Store, {
      foreignKey: {
        name: 'storeId',
        field: 'store_id',
      },
    });
  };

  // eslint-disable-next-line func-names
  StoreUser.prototype.toAuthJSON = function () {
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

  return StoreUser;
};
