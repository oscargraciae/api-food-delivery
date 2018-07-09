import models from '../../models';

const controller = {};

controller.getAll = async (req, res) => {
  const users = await models.User.findAll({ order: [['id', 'DESC']] });
  return res.json(users);
};

export default controller;
