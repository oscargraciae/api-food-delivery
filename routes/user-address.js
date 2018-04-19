import { Router } from 'express';
import userAddressController from '../controllers/user-address';

import { authJwt, authLocal } from '../auth.service';

const routes = new Router();

// address routes
routes.get('/', authJwt, userAddressController.getAddress);

export default routes;
