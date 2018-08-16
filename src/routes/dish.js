import { Router } from 'express';
import dishController from '../controllers/dish';

const routes = new Router();

routes.get('/', dishController.getAll);
routes.get('/category/:categoryId', dishController.getAllByCategory);
routes.get('/:id', dishController.get);

export default routes;
