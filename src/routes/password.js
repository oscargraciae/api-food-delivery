import { Router } from 'express';
import userController from '../controllers/user';

const routes = new Router();

routes.get('/', userController.validationToken);
routes.post('/:id', userController.changePassword);

export default routes;
