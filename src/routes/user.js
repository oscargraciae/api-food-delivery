import { Router } from 'express';
import userController from '../controllers/user';
import { authJwt, authLocal, authFacebook } from '../auth.service';

const routes = new Router();

// user routes
routes.get('/:id', authJwt, userController.get);
routes.post('/login-facebook', authFacebook, userController.loginFacebook);
routes.post('/login', authLocal, userController.login);
routes.post('/signup', userController.create);
routes.post('/address', authJwt, userController.createAddress);
routes.post('/link-business', authJwt, userController.createAddressWithBusiness);
routes.post('/send-password-email', userController.sendPasswordReset);

routes.post('/control-alerts', authJwt, userController.changeAlerts);

export default routes;
