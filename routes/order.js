import { Router } from 'express';
import orderController from '../controllers/order';
import { authJwt } from '../auth.service';

const routes = new Router();

routes.post('/', authJwt, orderController.create);
routes.post('/estimate-order', authJwt, orderController.estimateOrder);

export default routes;
