import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { google } from 'googleapis';
import GoogleSpreadsheet from 'google-spreadsheet';


import models from '../../models';

const controller = {};

const creds = require('../../config/credentials.json');
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const TOKEN_PATH = 'token.json';

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
    FROM orders
    GROUP BY to_char(created_at, 'YYYY-MM')
    ORDER BY to_char(created_at, 'YYYY-MM') asc
  `,
    { raw: true },
  );
  // const [data] = await models.sequelize.query(
  //   `
  //   SELECT to_char(created_at, 'YYYY-MM') as month, sum(total) as total_count
  //   FROM order_details
  //   GROUP BY to_char(created_at, 'YYYY-MM')
  //   ORDER BY to_char(created_at, 'YYYY-MM') asc
  // `,
  //   { raw: true },
  // );

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


controller.setDataSheets = async (req, res) => {
  // fs.readFile(`${__dirname}/../../credentials.json`, (err, content) => {
  //   if (err) return console.log('Error loading client secret file:', err);
  //   // Authorize a client with credentials, then call the Google Sheets API.
  //   authorize(JSON.parse(content), listMajors);
  // });

  const doc = new GoogleSpreadsheet('1AK_zbxaHAOkSC5xdVPPG6GlY3NUS3QPOwQaQaJV5pV8');
  // const users = await models.User.findAll({
  //   order: [['id', 'ASC']],
  //   limit: 10,
  // });

  // const [data] = await models.sequelize.query(
  //   'SELECT * FROM users ORDER BY id ASC LIMIT 30',
  //   { raw: true },
  // );

  const d = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const de = new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

  // WHERE order_details.delivery_date < '2018-10-27 00:26:50' AND order_details.delivery_date >= '2018-10-26 00:26:50'

  const [data] = await models.sequelize.query(
    `
    select DISTINCT users.id, users.*, user_addresses.*, orders.id as order_id, orders.total as total from users
    inner join orders on users.id = orders.user_id
    inner join user_addresses on user_addresses.id = orders.user_address_id
    inner join order_details on order_details.order_id = (select order_id from order_details where orders.id = order_details.order_id limit 1)
    WHERE order_details.delivery_date < '${d}' AND order_details.delivery_date >= '${de}'
  `,
    { raw: true },
  );

  console.log("ENTREGAS----->", data);

  doc.useServiceAccountAuth(creds, (error) => {
    if (error) console.log("Err--->", error);

    data.forEach((value, index) => {
      doc.addRow(2, { orderId: value.order_id, name: `${value.first_name} ${value.last_name}`, address: value.street, total: value.total }, (err) => {
        if (err) {
          console.log('Too many requests', err);
        } else {
          setTimeout(function() {
            // callback();
            console.log('Success');
          }, 100);
        }
      });
    });


    // doc.setHeaderRow(['name'], (e) => {
    //   doc.addRow(2, { name: 'Oscar', lastName: "Gracia" }, (err) => {
    //     if (err) console.log("ERROR----->", err);
    //     console.log("Row------->");
    //   });
    // });

    // doc.addWorksheet({ title: `Entregas ${Date.now()}` }, (err, sheet) => {
    //   sheet.setTitle(`Entregas ${Date.now()}`);
    //   sheet.resize({ rowCount: 50, colCount: 20 });
    //   sheet.setHeaderRow(['orderId', 'name', 'address', 'total', 'delivery'], (e) => {
    //     data.forEach((value, index) => {
    //       doc.addRow(2, { orderId: value.order_id, name: `${value.first_name} ${value.last_name}`, address: value.street, total: value.total }, (err) => {
    //         if (err) {
    //           console.log('Too many requests', err);
    //         } else {
    //           setTimeout(() => {
    //             console.log('Success');
    //           }, 100);
    //         }
    //       });
    //     });
    //   });
    //   // sheet.del(); //async
    // });



  });

  return res.json({ message: 'Documento creado' });
};


export default controller;
