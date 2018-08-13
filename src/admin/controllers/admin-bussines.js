import models from '../../models';

const controller = {};

controller.getAll = async (req, res) => {
  const orders = await models.Bussine.findAll({
    order: [['id', 'DESC']],
  });
  return res.json(orders);
};

export default controller;
