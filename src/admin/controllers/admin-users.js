import moment from 'moment';

import models from '../../models';
import sendSms from '../../utils/send-sms';

const controller = {};

controller.get = async (req, res) => {
  const user = await models.User.findOne({
    where: { id: req.params.id },
    include: [
      { model: models.UserAddress, as: 'user_address' },
    ],
  });
  return res.json(user);
};

controller.getAll = async (req, res) => {
  const users = await models.User.findAll({
    order: [['id', 'DESC']],
    include: [
      { model: models.UserAddress, as: 'user_address' },
    ],
  });
  return res.json(users);
};

// Metodo de usuarios por fecha entrega
controller.getAllByDeliveryDate = async (req, res) => {
  const d = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const de = new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

  // const [data] = await models.sequelize.query(
  //   `
  //   select DISTINCT users.id, users.* from users
  //   inner join orders on users.id = orders.user_id
  //   inner join order_details on orders.id = order_details.order_id
  //   WHERE order_details.delivery_date < '${d}' AND order_details.delivery_date >= '${de}'
  // `,
  //   { raw: true },
  // );

  const [data] = await models.sequelize.query(
    `
    select DISTINCT users.id, users.*, user_addresses.*, orders.id as order_id from users
    inner join orders on users.id = orders.user_id
    inner join user_addresses on user_addresses.id = orders.user_address_id
    inner join order_details on order_details.order_id = (select order_id from order_details where orders.id = order_details.order_id limit 1)
    WHERE order_details.delivery_date < '${d}' AND order_details.delivery_date >= '${de}'

  `,
    { raw: true },
  );

  // WHERE order_details.delivery_date < '2018-07-13 03:09:17' AND order_details.delivery_date >= '2018-07-12 03:09:17'

  return res.json(data);
};

controller.sendDeliveryNotification = async (req, res) => {
  const { id } = req.params;
  const order = await models.Order.findOne({ where: { id } });
  const address = await models.UserAddress.findOne({ where: { id: order.userAddressId } });
  const message = 'Eathouse: Hola, tu orden va en camino, ¡buen provecho!';
  // const phone = '8123203436';
  const { phone } = address;
  sendSms(message, phone);
  return res.json({ message: 'Notificacíon enviada' });
};

controller.getOrderByUser = async (req, res) => {
  const d = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const de = new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

  const orders = await models.User.findAll({
    where: {
      '$orders.order_details.delivery_date$': {
        lt: d,
        gte: de,
      },
    },
    include: [
      {
        model: models.Order,
        as: 'orders',
        include: [
          { model: models.UserAddress, as: 'user_address' },
          {
            model: models.OrderDetail,
            as: 'order_details',
            include: [
              { model: models.Dish },
            ],
          },
        ],
      },
    ],
  });
  return res.json(orders);
};


export default controller;
