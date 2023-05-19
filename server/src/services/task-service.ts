import { Request } from 'express';
import { v4 } from 'uuid';

import * as Storage from '../lib/handleFile';

class TaskService {
  private readonly Storage;

  constructor() {
    this.Storage = Storage;
  }

  getTasks() {
      const tasks = this.Storage.READ_FILE();

      return tasks;
  }
};

export default new TaskService();
