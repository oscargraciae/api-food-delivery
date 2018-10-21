import { Router } from 'express';
import controller from '../controllers/admin-data';

const routes = new Router();

routes.get('/general', controller.getGeneral);
routes.get('/users-month', controller.getUserByMonth);
routes.get('/orders-month', controller.getOrdersByMonth);
routes.get('/order-details-month', controller.getOrderDetailsByMonth);
routes.get('/order-total-month', controller.getOrderTotalByMonth);
routes.get('/sales-dishes', controller.getProfitByProduct);
routes.get('/profit-month', controller.getProfitByMonth);

export default routes;
