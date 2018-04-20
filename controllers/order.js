import conekta from 'conekta';

import models from '../models';

const controller = {};

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

export default controller;
