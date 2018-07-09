import { Router } from 'express';
import userController from '../controllers/admin-users';

const routes = new Router();

routes.get('/', userController.getAll);

export default routes;
