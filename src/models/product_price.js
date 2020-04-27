export default (sequelize, DataTypes) => {
  const ProductPrice = sequelize.define('product_prices', {
    price: {
      type: DataTypes.DECIMAL,
    },
  }, {});

  ProductPrice.associate = (models) => {
    ProductPrice.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        field: 'product_id',
      },
    });

    ProductPrice.belongsTo(models.UnidType, {
      foreignKey: {
        name: 'unidTypeId',
        field: 'unid_type_id',
      },
    });
  };

  return ProductPrice;
};
