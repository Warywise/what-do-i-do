import { NextFunction, Request, Response } from 'express';
import { Middleware } from '@decorators/express';

import { joiCategory } from './joi-objects/joi-categories';
import HTTP_CODES from '../lib/httpCodes';

export class CategoryVerifier implements Middleware {
  public use(req: Request, res: Response, next: NextFunction) {
    const { error } = joiCategory.validate(req.body);

    if (error) return res.status(HTTP_CODES.BAD_REQUEST).json({ error });

    next();
  }
}
