import conekta from 'conekta';
import sequelize from 'sequelize';


import models from '../models';

const controller = {};
const { Op } = sequelize;

async function calculateItems(data) {
  const dishes = [];
  let total = 0;
  let subtotal = 0;
  const fee = 0;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const dish = await models.Dish.findById(item.id);
    const totalItem = (dish.price * item.quantity);
    const orderDetail = {
      dishId: item.id,
      total: totalItem,
      quantity: item.quantity,
      deliveryDate: item.deliveryDate,
    };
    dishes.push(orderDetail);
    subtotal += totalItem;
  }
  total = subtotal + fee;
  return {
    total,
    subtotal,
    fee,
    dishes,
  };
}

function payment(data, callback) {
  conekta.api_key = 'key_jaiWQwqGqEkQqqkUqhdy2A';
  conekta.locale = 'es';
  conekta.Order.create({
    currency: 'MXN',
    customer_info: {
      customer_id: data.customerId,
    },
    line_items: data.items,
    charges: [{
      payment_method: {
        type: 'card',
        payment_source_id: data.paymentSourceId,
      },
    }],
  }, (err, order) => {
    if (err) {
      return callback({
        ok: false,
        err,
      });
    }
    return callback({
      ok: true,
      order,
    });
  });
}

async function saveOrderDishes(dishes, order) {
  for (let x = 0; x < dishes.length; x++) {
    const item = dishes[x];
    console.log("Guardado de platillo------->", item);
    await models.OrderDetail.create({ ...item, orderId: order.id });
  }
}

async function saveOrder(order) {
  const resp = await models.Order.create({ ...order });
  return resp;
}

controller.create = async (req, res) => {
  try {
    const data = req.body;
    const order = await calculateItems(data.orderDetails);
    console.log("##########################");
    console.log(data.orderDetails);
    const newDishes = data.orderDetails.map(item => ({ name: item.name, unit_price: Number(item.price * 100), quantity: item.quantity }));

    const creditCard = await models.CreditCard.findById(data.creditCardId);

    payment({ customerId: req.user.conektaid, items: newDishes, paymentSourceId: creditCard.token }, async (orderConekta) => {
      if (orderConekta.ok) {
        const orderResp = await saveOrder({
          ...data, ...order, userId: req.user.id, orderStatusId: 1,
        });
        saveOrderDishes(order.dishes, orderResp);
        return res.json({
          ok: true,
          orderResp,
        });
      }
      return res.json({
        ok: false,
        err: orderConekta.err,
      });
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'No se ha podido procesar la orden',
      error: error.message,
    });
  }
};

controller.estimateOrder = async (req, res) => {
  // Calcula el costo de la orden en base a los productos
  const data = req.body;
  const dishes = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const dish = await models.Dish.findById(item.id);
    const orderDetail = {
      total: (dish.price * item.quantity),
      quantity: item.quantity,
    };
    dishes.push(orderDetail);
  }
  return res.json(dishes);
};


controller.getAll = async (req, res) => {
  const orders = await models.Order.findAll({
    where: { userId: req.user.id },
    include: [
      { model: models.UserAddress, as: 'user_address' },
    ],
    order: [['id', 'DESC']],
  });
  return res.json(orders);
};

controller.getDetail = async (req, res) => {
  const detail = await models.OrderDetail.findAll({
    where: { orderId: req.params.id },
    include: [
      { model: models.Dish, as: 'dish' },
    ],
  });
  return res.json(detail);
};

controller.getSchedules = async (req, res) => {
  const schedules = await models.OrderDetail.findAll({
    where: {
      deliveryDate: {
        // [Op.lt]: new Date(),
        [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
    },
    include: [{
      model: models.Order,
      where: { userId: req.user.id },
    }, { model: models.Dish, as: 'dish' }],
    // group: ['deliveryDate'],
    // group: ['orderId'],
  });
  return res.json(schedules);
};

export default controller;
