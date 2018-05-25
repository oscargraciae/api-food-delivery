import models from '../models';
import { addContactToList } from '../utils/sendgrid-client';

const controller = {};

controller.get = async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findOne({
    where: { id },
    include: [
      { model: models.UserAddress, as: 'user_address' },
    ],
  });

  return res.json(user);
};

controller.login = (req, res, next) => {
  res.status(200).json({
    ok: true,
    user: req.user.toAuthJSON(),
  });
  return next();
};

controller.create = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    if (user) {
      await addContactToList(user);
    }
    return res.status(201).json({
      ok: true,
      user,
    });
  } catch (err) {
    return res.json({
      ok: false,
      errors: err.message,
    });
  }
};

controller.createAddress = async (req, res) => {
  try {
    const data = req.body;
    const address = await models.UserAddress.create({ ...data, userId: req.user.id });
    if (address) {
      const user = await models.User.findOne({
        where: { id: req.user.id },
      });
      user.update({ withAddress: true });
    }
    return res.json({
      ok: true,
      address,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

export default controller;
