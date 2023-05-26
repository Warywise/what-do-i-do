import { Request, Response } from 'express';

import * as Storage from '../lib/handleFile';
import HTTP_CODES from '../lib/httpCodes';

class CategoryService {
  private readonly Storage;

  constructor(storage = Storage) {
    this.Storage = storage;
  }

  readonly createCategory = (req: Request, res: Response) => {
    const { name } = req.body as { [key: string]: string };
    const tasksFile = this.Storage.READ_FILE();

    if (tasksFile[name]) {
      res.status(HTTP_CODES.BAD_REQUEST);
      throw new Error('Board name already exists!');
    }

    tasksFile[name] = [];

    this.Storage.WRITE_FILE(tasksFile);

    return tasksFile;
  }

  readonly deleteCategory = (req: Request, res: Response) => {
    const { name } = req.body as { [key: string]: string };
    const tasksFile = this.Storage.READ_FILE();

    if (!tasksFile[name]) {
      res.status(HTTP_CODES.NOT_FOUND);
      throw new Error('Board name not found!');
    }

    delete tasksFile[name];

    this.Storage.WRITE_FILE(tasksFile);

    return tasksFile;
  }
}

export default CategoryService;
