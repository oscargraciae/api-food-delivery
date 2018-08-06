import models from '../../models';

const controller = {};

controller.getGeneral = async (req, res) => {
  const totalSale = await models.Order.sum('total');
  const totalOrdeDetails = await models.OrderDetail.count();
  const totalOrdes = await models.Order.count();
  const totalUsers = await models.User.count();

  return res.json({ data: { totalSale, totalUsers, totalOrdes, totalOrdeDetails } });
};

controller.getUserByMonth = async (req, res) => {
  const [data] = await models.sequelize.query(
    `
    SELECT to_char(created_at, 'YYYY-MM') as month, count(created_at) as total_count
    FROM users
    GROUP BY to_char(created_at, 'YYYY-MM')
    ORDER BY to_char(created_at, 'YYYY-MM') asc
  `,
    { raw: true },
  );

  return res.json(data);
};


controller.getOrdersByMonth = async (req, res) => {
  const [data] = await models.sequelize.query(
    `
    SELECT to_char(created_at, 'YYYY-MM') as month, count(created_at) as total_count
    FROM orders
    GROUP BY to_char(created_at, 'YYYY-MM')
    ORDER BY to_char(created_at, 'YYYY-MM') asc
  `,
    { raw: true },
  );

  return res.json(data);
};

export default controller;
