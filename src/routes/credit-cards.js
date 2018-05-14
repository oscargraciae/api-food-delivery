import { Router } from 'express';
import creditCardController from '../controllers/credit-card';
import { authJwt, authLocal } from '../auth.service';

const routes = new Router();

routes.get('/', authJwt, creditCardController.getByUser);
routes.post('/', authJwt, creditCardController.create);

export default routes;
