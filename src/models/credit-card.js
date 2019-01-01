export default (sequelize, DataTypes) => {
  const CreditCard = sequelize.define('credit_card', {
    token: DataTypes.STRING,
    last4: DataTypes.STRING,
    brand: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'isActive',
    },
  }, { underscored: true });

  CreditCard.associate = (models) => {
    CreditCard.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return CreditCard;
};
