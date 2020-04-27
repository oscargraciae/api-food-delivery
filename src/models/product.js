export default (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'is_active',
      defaultValue: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Store, {
      foreignKey: {
        name: 'storeId',
        field: 'store_id',
      },
    });

    Product.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        field: 'category_id',
      },
    });

    Product.hasMany(models.ProductPrice, {
      foreignKey: {
        name: 'productId',
        field: 'product_id',
      },
    });
  };

  return Product;
};
