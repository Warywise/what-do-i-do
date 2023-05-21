import { Request as RequestType, Response as ResponseType } from 'express';
import { Controller, Delete, Post, Request, Response } from '@decorators/express';

import CategoryService from '../services/category-service';
import Handler from '../lib/handler';
import HTTP_CODES from '../lib/httpCodes';

@Controller('/category')
export default class CategoryController extends Handler {
  private readonly CategoryService;

  constructor() {
    super();
    this.CategoryService = new CategoryService();
  }

  @Post('')
  createCategory(@Request() req: RequestType, @Response() res: ResponseType) {
    const tasks = this.TryCatch(() => this.CategoryService.createCategory(req));

    return res.status(HTTP_CODES.CREATED).json(tasks);
  }

  @Delete('')
  deleteCategory(@Request() req: RequestType, @Response() res: ResponseType) {
    const tasks = this.TryCatch(() => this.CategoryService.deleteCategory(req, res));

    return res.status(HTTP_CODES.OK).json(tasks);
  }
}
