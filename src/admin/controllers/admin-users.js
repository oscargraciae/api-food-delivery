import models from '../../models';
import sendSms from '../../utils/send-sms';

const controller = {};

controller.getAll = async (req, res) => {
  const users = await models.User.findAll({ order: [['id', 'DESC']] });
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
    select DISTINCT users.id, users.*, user_addresses.* from users
    inner join orders on users.id = orders.user_id
    inner join user_addresses on user_addresses.id = orders.user_address_id
    inner join order_details on order_details.order_id = (select order_id from order_details where orders.id = order_details.order_id limit 1)
    WHERE order_details.delivery_date < '2018-07-13 03:09:17' AND order_details.delivery_date >= '2018-07-12 03:09:17'
    
  `,
    { raw: true },
  );

  // WHERE order_details.delivery_date < '${d}' AND order_details.delivery_date >= '${de}'

  return res.json(data);
};

controller.sendDeliveryNotification = (req, res) => {
  const { id } = req.params;
  const user = models.User.findOne({ where: { id } });
  const message = `Eathouse: Hola ${user.firstName}, tu orden va camino. Te deseamos buen provecho.`;
  const phone = '8123203436';
  sendSms(message, phone);
  return res.json({ message: 'Notificacíon enviada' });
};

export default controller;
