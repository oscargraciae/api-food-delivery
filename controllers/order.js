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

controller.create = async (req, res) => {
  // Se registra una nueva orden
  try {
    const data = req.body;
    const {
      total, subtotal, fee, dishes,
    } = await calculateItems(data.orderDetails);
    const order = {
      subtotal,
      total,
      fee,
      userId: req.user.id,
      orderStatusId: 1,
    };
    const orderResp = await models.Order.create({ ...data, ...order });

    for (let x = 0; x < dishes.length; x++) {
      const item = dishes[x];
      const orderDetailResp = await models.OrderDetail.create({ ...item, orderId: orderResp.id });
    }
    return res.json({
      ok: true,
      orderResp,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'No se ha podido procesar la orden',
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

  // total, subtotal, fee
  // array[{ total, quantity  }]
  return res.json(dishes);
};

export default controller;
