import { Router } from 'express';
import dishController from '../controllers/admin-dishes';

const routes = new Router();

routes.get('/', dishController.getAll);
routes.post('/', dishController.create);

export default routes;
