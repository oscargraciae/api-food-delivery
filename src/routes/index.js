import userRoutes from './user';
import userAddressRoutes from './user-address';
import dishRoutes from './dish';
import creditCardsRoutes from './credit-cards';
import orderRoutes from './order';
import passwordRoutes from './password';

// admin
import orderAdminRoutes from '../admin/routes/admin-order';

import { authJwt } from '../auth.service';

export default (app) => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/address', userAddressRoutes);
  app.use('/api/v1/dishes', dishRoutes);
  app.use('/api/v1/password', passwordRoutes);
  app.use('/api/v1/credit-cards', creditCardsRoutes);
  app.use('/api/v1/orders', orderRoutes);

  app.use('/api/admin/orders', orderAdminRoutes);

};

