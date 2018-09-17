import { Router } from 'express';
import userController from '../controllers/admin-users';

const routes = new Router();

routes.get('/', userController.getAll);
routes.get('/:id', userController.get);
routes.get('/delivery/date', userController.getAllByDeliveryDate);
routes.get('/:id/delivery-notification', userController.sendDeliveryNotification);

export default routes;
