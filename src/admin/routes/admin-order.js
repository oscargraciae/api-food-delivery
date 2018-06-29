import { Router } from 'express';
import orderController from '../controllers/admin-order';

const routes = new Router();

routes.get('/', orderController.getAll);

export default routes;
