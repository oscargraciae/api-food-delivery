import { Router } from 'express';
import userController from '../controllers/admin-users';

const routes = new Router();

routes.get('/', userController.getAll);
routes.get('/delivery', userController.getAllByDeliveryDate);
routes.get('/delivery-notification', userController.sendDeliveryNotification);

export default routes;
