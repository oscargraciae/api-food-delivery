export default (sequelize, DataTypes) => {
  const DishCalendar = sequelize.define('dish_calendar', {
    date: DataTypes.DATE,
  }, { underscored: true });

  DishCalendar.associate = (models) => {
    DishCalendar.belongsTo(models.Dish);
  };

  return DishCalendar;
};
