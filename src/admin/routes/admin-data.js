import { Router } from 'express';
import controller from '../controllers/admin-data';

const routes = new Router();

routes.get('/general', controller.getGeneral);
routes.get('/users-month', controller.getUserByMonth);
routes.get('/orders-month', controller.getOrdersByMonth);

export default routes;
