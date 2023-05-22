import { NextFunction, Request, Response } from 'express';
import { Middleware } from '@decorators/express';
import { ValidationError } from 'joi';

import { joiTaskDelete, joiTaskPatch, joiTaskPost } from './joi-objects/joi-tasks';
import HTTP_CODES from '../lib/httpCodes';

export class TaskVerifier implements Middleware {
  public use(req: Request, res: Response, next: NextFunction) {
    const error = this.verifyFields(req);

    if (error) return res.status(HTTP_CODES.BAD_REQUEST).json({ error });

    next();
  }

  private verifyFields(req: Request) {
    const reqType = req.method;
    const taskData = req.body;
    let error: ValidationError | undefined;

    switch (reqType) {
      case 'POST':
        error = joiTaskPost.validate(taskData).error;
        break;
      case 'PATCH':
        error = joiTaskPatch.validate(taskData).error;
        break;
      case 'DELETE':
        error = joiTaskDelete.validate(taskData).error;
        break;
      default:
        break;
    }

    return error;
  }
}
