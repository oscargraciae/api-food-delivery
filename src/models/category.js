export default (sequelize, DataTypes) => {
  const Category = sequelize.define('categories', {
    name: DataTypes.STRING,
  }, { timestamps: false });
  return Category;
};
