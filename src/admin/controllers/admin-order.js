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

controller.getAllGroup = async (req, res) => {
  const { date } = req.params;
  console.log("DATE--->", date);
  // const d = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  // const de = new Date(new Date().setDate(new Date(date).getDate() + 1)).toISOString().slice(0, 19).replace('T', ' ');

  const d = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const de = new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

  console.log("NEXT DATE----->", de);

  const [data] = await models.sequelize.query(`
    SELECT order_details.dish_id, dishes.name, SUM(order_details.quantity)
    FROM order_details
    INNER JOIN dishes ON dishes.id = dish_id
    WHERE order_details.delivery_date < '${d}' AND order_details.delivery_date >= '${de}'
    GROUP BY dish_id, dishes.name
    ORDER BY sum desc
  `);
  return res.json(data);
};

// WHERE order_details.delivery_date > '${d}' AND order_details.delivery_date <= '${de}'

export default controller;
