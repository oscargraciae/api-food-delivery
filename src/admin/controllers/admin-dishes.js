import models from '../../models';

const controller = {};

controller.getAll = async (req, res) => {
  const dishes = await models.Dish.findAll({ order: [['id', 'DESC']] });
  return res.json(dishes);
};

controller.create = async (req, res) => {
  try {
    const product = await models.Dish.create(req.body);
    return res.json({ success: true, product });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default controller;
