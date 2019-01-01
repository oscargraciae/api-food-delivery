import models from '../models';

const controller = {};

controller.getAddress = async (req, res) => {
  try {
    const addresses = await models.UserAddress.findAll({ where: { userId: req.user.id, isActive: true }, order: [['id', 'DESC']] });
    return res.json(addresses);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

export default controller;
