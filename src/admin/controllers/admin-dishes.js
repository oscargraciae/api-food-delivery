import models from '../../models';

const controller = {};

controller.getAll = async (req, res) => {
  const dishes = await models.Dish.findAll({ order: [['id', 'DESC']] });
  return res.json(dishes);
};

export default controller;
