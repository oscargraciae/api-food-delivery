export default (sequelize, DataTypes) => {
  const UnidType = sequelize.define('unid_types', {
    name: DataTypes.STRING,
  }, { timestamps: false });
  return UnidType;
};
