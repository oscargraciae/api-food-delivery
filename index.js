import express from 'express';
import cors from 'cors';

import models from './models';
import middlewareConfig from './config/middlewares';
import apiRoutes from './routes';

import mocks from './mocks';

const app = express();

middlewareConfig(app);
apiRoutes(app);

models.sequelize.sync().then(() => {
  app.listen(3001);
});

