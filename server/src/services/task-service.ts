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

  createTask(req: Request) {
    const { title, description, category } = req.body as { [key: string]: string };
    const tasks = this.Storage.READ_FILE();

    const newTask = {
      id: v4(),
      title,
      description,
      createdAt: new Date(),
      concludedAt: null,
    };

    tasks[category].push(newTask);

    this.Storage.WRITE_FILE(tasks);

    return newTask;
  }

  updateTask(req: Request) {
    const { id, title, description, category, concluded } = req.body as { [key: string]: string } & { concluded: boolean };
    const tasks = this.Storage.READ_FILE();

    const taskIndex = tasks[category].findIndex((task) => task.id === id);

    if (taskIndex < 0) throw new Error('Tarefa não encontrada!');

    const task = tasks[category][taskIndex];

    if (concluded) {
      task.concludedAt = new Date();
    } else {
      task.title = title;
      task.description = description;
    }

    this.Storage.WRITE_FILE(tasks);

    return tasks;
  }
};

export default new TaskService();
