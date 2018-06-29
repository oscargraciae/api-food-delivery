import moment from 'moment';

import models from '../../models';

const controller = {};

controller.getAll = async (req, res) => {
  const dateNow = moment(new Date(Date.now()), 'YYYY-MM-DD').format('YYYY-MM-DD');
  const orders = await models.OrderDetail.findAll({
    where: {
      deliveryDate: {
        lt: new Date(),
        gte: Date.parse(dateNow),
        // gte: Date.parse('2018-06-27'),
      },
    },
    include: [{ model: models.Order }, { model: models.Dish, as: 'dish' }],
  });
  return res.json(orders);
};

export default controller;
