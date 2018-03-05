import bcrypt from 'bcrypt';

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
  }, {
    hooks: {
      afterValidate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        // eslint-disable-next-line no-param-reassign
        user.password = hashedPassword;
      },
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.Suscription, {
      foreignKey: {
        name: 'suscriptionId',
        field: 'suscription_id',
      },
    });

    
    User.hasMany(models.UserAddress, { as: 'userAddress' }, { foreignKey: { name: 'userId', field: 'user_id' } });
    
    // User.hasMany(models.UserAddress, {foreignKey: 'AuthorId'})

  };

  return User;
};
