import moment from 'moment';

import models from '../../models';

const controller = {};

controller.getOrders = async (req, res) => {
  const orders = await models.Order.findAll({
    include: [
      { model: models.UserAddress, as: 'user_address' },
      { model: models.User },
    ],
    order: [['id', 'DESC']],
  });
  return res.json(orders);
};

controller.getOrder = async (req, res) => {
  const orders = await models.Order.findOne({
    where: { id: req.params.id },
    include: [
      { model: models.UserAddress, as: 'user_address' },
      { model: models.User },
    ],
    order: [['id', 'DESC']],
  });
  return res.json(orders);
};

controller.getOrderDetail = async (req, res) => {
  const detail = await models.OrderDetail.findAll({
    where: { orderId: req.params.id },
    include: [
      { model: models.Dish, as: 'dish' },
    ],
  });
  return res.json(detail);
};

controller.getAll = async (req, res) => {
  const { date } = req.params;
  const yesterday = moment(date).add(1, 'days');
  const orders = await models.OrderDetail.findAll({
    where: {
      deliveryDate: {
        lt: Date.parse(yesterday),
        gte: Date.parse(date),
      },
    },
    include: [{ model: models.Order, include: [models.User] }, { model: models.Dish, as: 'dish' }],
  });
  return res.json(orders);
};

export default controller;
