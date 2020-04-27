import express from 'express';
import cors from 'cors';

import models from './models';
import middlewareConfig from './config/middlewares';
import apiRoutes from './routes';

import mocks from './mocks';

const app = express();

middlewareConfig(app);
apiRoutes(app);

const port = process.env.PORT || 3001;

// app.listen(port, () => {
//   console.log(`Server listen on port: ${port}`);
// });

// models.sequelize.sync({ alter: true }).then(() => {
//   app.listen(3001);
// });

models.sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server listen on port: ${port}`);
  });
});
