import models from '../models';

const controller = {};

controller.getAll = async (req, res) => {
  const dishes = await models.Dish.findAll();
  return res.json(dishes);
};

controller.get = async (req, res) => {
  const dish = await models.Dish.findOne({ where: { id: req.params.id } });
  return res.json(dish);
};

export default controller;
