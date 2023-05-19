import Express from 'express';
import { attachControllers } from '@decorators/express';

import TaskController from './controllers/task-controller';

const router = Express.Router();

attachControllers(router, [
  TaskController,
]);

export default router;
