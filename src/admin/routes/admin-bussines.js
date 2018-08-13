import { Router } from 'express';
import controller from '../controllers/admin-bussines';

const routes = new Router();

routes.get('/', controller.getAll);

export default routes;
