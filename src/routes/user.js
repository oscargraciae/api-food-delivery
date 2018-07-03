import { Router } from 'express';
import userController from '../controllers/user';
import { authJwt, authLocal } from '../auth.service';

const routes = new Router();

// user routes
routes.get('/:id', authJwt, userController.get);
routes.post('/login', authLocal, userController.login);
routes.post('/signup', userController.create);
routes.post('/address', authJwt, userController.createAddress);
routes.post('/send-password-email', userController.sendPasswordReset);

export default routes;
