import { Request, Response } from 'express';
import { v4 } from 'uuid';

import * as Storage from '../lib/handleFile';
import HTTP_CODES from '../lib/httpCodes';

class TaskService {
  private readonly Storage;

  constructor(storage = Storage) {
    this.Storage = storage;
  }

  readonly getTasks = () => {
    const tasks = this.Storage.READ_FILE();

    return tasks;
  }

  readonly createTask = (req: Request) => {
    const { title, description, category } = req.body as { [key: string]: string };
    const tasks = this.Storage.READ_FILE();

    const newTask = {
      id: v4(),
      title,
      description: description || null,
      createdAt: `${new Date()}`,
      concludedAt: null,
    };

    tasks[category].push(newTask);

    this.Storage.WRITE_FILE(tasks);

    return tasks;
  }

  readonly updateTask = (req: Request, res: Response) => {
    const { id, title, description, category, concluded } = req.body as { [key: string]: string } & { concluded: boolean };
    const tasks = this.Storage.READ_FILE();

    const taskIndex = tasks[category].findIndex((task) => task.id === id);

    if (taskIndex < 0) {
      res.status(HTTP_CODES.BAD_REQUEST);
      throw new Error('Tarefa não encontrada!');
    }

    const task = tasks[category][taskIndex];

    if (concluded) {
      task.concludedAt = `${new Date()}`;
    } else {
      task.title = title;
      task.description = description || null;
    }

    this.Storage.WRITE_FILE(tasks);

    return tasks;
  }

  readonly deleteTask = (req: Request, res: Response) => {
    const { id, category } = req.body as { [key: string]: string };
    const tasks = this.Storage.READ_FILE();

    const taskIndex = tasks[category].findIndex((task) => task.id === id);

    if (taskIndex < 0) {
      res.status(HTTP_CODES.BAD_REQUEST);
      throw new Error('Tarefa não encontrada!');
    }

    tasks[category].splice(taskIndex, 1);

    this.Storage.WRITE_FILE(tasks);

    return tasks;
  }
};

export default TaskService;
