import userRoutes from './user';
import userAddressRoutes from './user-address';
import dishRoutes from './dish';
import creditCardsRoutes from './credit-cards';
import orderRoutes from './order';
import passwordRoutes from './password';

// admin
import orderAdminRoutes from '../admin/routes/admin-order';
import userAdminRoutes from '../admin/routes/admin-users';
import dataAdminRoutes from '../admin/routes/admin-data';
import bussinesAdminRoutes from '../admin/routes/admin-bussines';
import dishesAdminRoutes from '../admin/routes/admin-dishes';

import { authJwt } from '../auth.service';

export default (app) => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/address', userAddressRoutes);
  app.use('/api/v1/dishes', dishRoutes);
  app.use('/api/v1/password', passwordRoutes);
  app.use('/api/v1/credit-cards', creditCardsRoutes);
  app.use('/api/v1/orders', orderRoutes);
  app.use('/api/v1/bussines', bussinesAdminRoutes);

  app.use('/api/admin/orders', orderAdminRoutes);
  app.use('/api/admin/users', userAdminRoutes);
  app.use('/api/admin/data', dataAdminRoutes);
  app.use('/api/admin/bussines', bussinesAdminRoutes);
  app.use('/api/admin/dishes', dishesAdminRoutes);
};
