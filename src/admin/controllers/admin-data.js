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


controller.getOrderDetailsByMonth = async (req, res) => {
  const [data] = await models.sequelize.query(
    `
    SELECT to_char(created_at, 'YYYY-MM') as month, sum(quantity) as total_count
    FROM order_details
    GROUP BY to_char(created_at, 'YYYY-MM')
    ORDER BY to_char(created_at, 'YYYY-MM') asc
  `,
    { raw: true },
  );

  return res.json(data);
};

controller.getOrderTotalByMonth = async (req, res) => {
  const [data] = await models.sequelize.query(
    `
    SELECT to_char(created_at, 'YYYY-MM') as month, sum(total) as total_count
    FROM order_details
    GROUP BY to_char(created_at, 'YYYY-MM')
    ORDER BY to_char(created_at, 'YYYY-MM') asc
  `,
    { raw: true },
  );

  return res.json(data);
};

controller.getProfitByProduct = async (req, res) => {
  const [data] = await models.sequelize.query(`
    SELECT order_details.dish_id, dishes.name,
      SUM(order_details.quantity),
      SUM(total) as sale,
      SUM(dish_details.cost * order_details.quantity) as expense,
      SUM(total - (dish_details.cost * order_details.quantity)) as revenue
    FROM order_details
    INNER JOIN dishes ON dishes.id = order_details.dish_id
    INNER JOIN dish_details ON dish_details.dish_id = order_details.dish_id
    WHERE EXTRACT(MONTH FROM order_details.created_at) = (SELECT EXTRACT(month FROM CURRENT_DATE))
    GROUP BY order_details.dish_id, dishes.name
    ORDER BY sale DESC
  `);
  return res.json(data);
};

controller.getProfitByMonth = async (req, res) => {
  const [data] = await models.sequelize.query(`
    SELECT
      to_char(created_at, 'YYYY-MM') as month,
      SUM(order_details.quantity),
      SUM(total) as sale,
        SUM(dish_details.cost * order_details.quantity) as expense,
        SUM(total - (dish_details.cost * order_details.quantity)) as revenue
    FROM order_details
    INNER JOIN dish_details ON dish_details.dish_id = order_details.dish_id
    GROUP BY to_char(created_at, 'YYYY-MM')
    ORDER BY to_char(created_at, 'YYYY-MM') DESC

  `);
  return res.json(data);
};

export default controller;
