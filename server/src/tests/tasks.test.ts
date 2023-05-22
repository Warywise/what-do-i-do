import request from 'supertest';
import { resolve as resolvePath } from 'path';
import { v4 } from 'uuid';

import server from '../server';
import HTTP_CODES from '../lib/httpCodes';
import { TaskFile, TaskObject } from '../lib/taskTypes';
import * as Storage from '../lib/handleFile';

export const tasksTests = describe('Test the path "/tasks":', () => {
  let TASKS_BACKUP: TaskFile;
  beforeAll(() => {
    const testTasksPath = resolvePath(__dirname, 'tasks_test.json');
    const testTasks = Storage.READ_FILE(testTasksPath);

    TASKS_BACKUP = Storage.READ_FILE();
    Storage.WRITE_FILE(testTasks);
  });
  afterAll(() => {
    Storage.WRITE_FILE(TASKS_BACKUP);
  });

  const title = 'Teste de Tarefa';
  const description = 'Descrição de teste';
  const category = 'general';
  const concluded = true;
  let taskId: string;

  test('It should response the GET method', async () => {
    const response = await request(server).get('/tasks');

    expect(response.statusCode).toEqual(HTTP_CODES.OK);
    expect(typeof response.body).toEqual('object');
    expect(response.body).toHaveProperty('general');
  });

  test('It should response the POST method', async () => {
    const response = await request(server).post('/tasks')
      .send({ title, description, category });

    expect(response.statusCode).toEqual(HTTP_CODES.CREATED);
    expect(typeof response.body).toEqual('object');

    const testTask = [...response.body[category]].find((task: TaskObject) => task.title === title) as TaskObject;
    expect(typeof testTask).toEqual('object');
    expect(testTask.title).toEqual(title);
    expect(testTask.concludedAt).toBeNull();
    expect(testTask).toHaveProperty('id');

    taskId = testTask.id;
  });

  test('It should response the PATCH method', async () => {
    const response = await request(server).patch('/tasks')
      .send({ id: taskId, concluded, category });

    expect(response.statusCode).toEqual(HTTP_CODES.OK);

    const testTask = [...Storage.READ_FILE().general].find((task: TaskObject) => task.id === taskId) as TaskObject;

    expect(typeof testTask).toEqual('object');
    expect(testTask.concludedAt).not.toBeNull();
    expect(typeof testTask.concludedAt).toEqual('string');
  });

  test('It should response the DELETE method', async () => {
    const response = await request(server).delete('/tasks')
      .send({ id: taskId, category });

    expect(response.statusCode).toEqual(HTTP_CODES.OK);

    const taskFile = Storage.READ_FILE();
    expect(taskFile).toHaveProperty('general');

    const testTask = taskFile.general.find((task) => task.id === taskId);
    expect(testTask).toBeUndefined();
  });

  test('It should response bad requests with error codes', async () => {
    const notFoundId = v4();

    const postResponse = await request(server).post('/tasks').send({ title: 0, description, category });
    const patchResponse = await request(server).patch('/tasks').send({ id: taskId, concluded, category: 'invalid' });
    const deleteResponse = await request(server).delete('/tasks').send({ id: notFoundId, category });

    expect(postResponse.statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
    expect(patchResponse.statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
    expect(deleteResponse.statusCode).toEqual(HTTP_CODES.NOT_FOUND);
  });
});
