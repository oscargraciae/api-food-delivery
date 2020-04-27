export default (sequelize, DataTypes) => {
  const Store = sequelize.define('stores', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cover: DataTypes.STRING,
    isActive: {
      field: 'is_active',
      type: DataTypes.BOOLEAN,
      default_value: false,
    },
    keyname: DataTypes.STRING,
  }, {});

  Store.associate = (models) => {
    Store.hasMany(models.Product, { foreignKey: { name: 'storeId', field: 'store_id' } });
  };

  return Store;
};
