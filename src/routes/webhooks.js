import { Router } from 'express';
import webhookController from '../controllers/webhooks';

const routes = new Router();

routes.get('/facebook/webhook', webhookController.get);
routes.post('/facebook/webhook', webhookController.setMessage);

export default routes;
