import { Router } from 'express';
import orderController from '../controllers/admin-order';

const routes = new Router();

routes.get('/', orderController.getOrders);
routes.get('/:id', orderController.getOrder);
routes.get('/:id/detail', orderController.getOrderDetail);
routes.get('/:date/day', orderController.getAll);
routes.get('/:date/group', orderController.getAllGroup);

export default routes;
