export default (sequelize, DataTypes) => {
  const UserAddress = sequelize.define('user_address', {
    street: DataTypes.STRING,
    area: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    phone: DataTypes.STRING,
    notes: DataTypes.STRING,
    addressMap: {
      type: DataTypes.STRING,
      field: 'address_map',
    },
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
  });

  UserAddress.associate = (models) => {
    UserAddress.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return UserAddress;
};
