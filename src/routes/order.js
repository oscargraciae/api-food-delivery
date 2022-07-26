import { Router } from 'express';
import orderController from '../controllers/order';
import { authJwt } from '../auth.service';

const routes = new Router();

routes.get('/', authJwt, orderController.getAll);
routes.get('/order-detail/:id', authJwt, orderController.getDetail);
routes.get('/schedules', authJwt, orderController.getSchedules);

routes.post('/', authJwt, orderController.create);
routes.post('/cash', authJwt, orderController.orderCashCreate);
routes.post('/estimate-order', authJwt, orderController.estimateOrder);

export default routes;
