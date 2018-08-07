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
  // const dateNow = moment(new Date(date), 'YYYY-MM-DD').format('YYYY-MM-DD');
  // console.log("Fecha server-->", dateNow);
  // const dateNow = moment(new Date(Date.now()), 'YYYY-MM-DD').format('YYYY-MM-DD');
  const yesterday = moment(date).add(1, 'days');
  const orders = await models.OrderDetail.findAll({
    where: {
      deliveryDate: {
        // lt: new Date(),
        // lt: date,
        lt: Date.parse(yesterday),
        gte: Date.parse(date),
        // gte: Date.parse('2018-06-27'),
      },
    },
    include: [{ model: models.Order, include: [models.User] }, { model: models.Dish, as: 'dish' }],
  });
  return res.json(orders);
};

export default controller;
