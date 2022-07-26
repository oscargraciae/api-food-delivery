import models from '../models';
import { test, addContactToList } from '../utils/sendgrid-client';

const controller = {};

controller.getAll = async (req, res) => {
  const dishes = await models.Dish.findAll({ where: { active: true }, order: [['category_id', 'ASC']] });
  return res.json(dishes);
};

controller.getAllByCategory = async (req, res) => {
  const dishes = await models.Dish.findAll({
    where: {
      active: true,
      categoryId: req.params.categoryId,
    },
    order: [['price', 'ASC']],
  });
  return res.json(dishes);
};

controller.get = async (req, res) => {
  const dish = await models.Dish.findOne({ where: { id: req.params.id } });
  return res.json(dish);
};

export default controller;
