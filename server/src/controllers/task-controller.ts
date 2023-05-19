import { Request as RequestType, Response as ResponseType } from 'express';
import {
  Controller, Delete, Get, Patch, Post, Request, Response,
} from '@decorators/express';

import Handler from '../lib/handler';
import TaskService from '../services/task-service';
import HTTP_CODES from '../lib/httpCodes';

@Controller('/tasks')
export default class TaskController extends Handler {
  constructor() {
    super();
  }

  @Get('')
  getTasks(@Request() _req: RequestType, @Response() res: ResponseType) {
    const tasks = this.TryCatch(TaskService.getTasks);

    return res.status(HTTP_CODES.OK).json(tasks);
  }

  @Post('')
  createTask(@Request() req: RequestType, @Response() res: ResponseType) {
    const task = this.TryCatch(() => TaskService.createTask(req));

    return res.status(HTTP_CODES.CREATED).json(task);
  }

  @Patch('')
  updateTask(@Request() req: RequestType, @Response() res: ResponseType) {
    const tasks = this.TryCatch(() => TaskService.updateTask(req));

    return res.status(HTTP_CODES.OK).json(tasks);
  }

  @Delete('')
  deleteTask(@Request() req: RequestType, @Response() res: ResponseType) {
    const tasks = this.TryCatch(() => TaskService.deleteTask(req));

    return res.status(HTTP_CODES.OK).json(tasks);
  }
}
