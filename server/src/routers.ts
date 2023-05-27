import Express from 'express';
import { attachControllers } from '@decorators/express';

import TaskController from './controllers/task-controller';
import CategoryController from './controllers/category-controller';

const router = Express.Router();

attachControllers(router, [
  TaskController,
  CategoryController,
]);

export default router;
