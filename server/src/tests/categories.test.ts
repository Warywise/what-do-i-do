import request from 'supertest';
import { resolve as resolvePath } from 'path';

import server from '../server';
import HTTP_CODES from '../lib/httpCodes';
import * as Storage from '../lib/handleFile';
import { TaskFile } from '../lib/taskTypes';

export const categoriesTests = describe('Test the path "/category"', () => {
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

  const name = 'Teste de Categoria';

  test('It should response the POST method', async () => {
    const response = await request(server).post('/category')
      .send({ name });

    expect(response.statusCode).toEqual(HTTP_CODES.CREATED);
    expect(typeof response.body).toEqual('object');

    const testCategory = Object.keys(response.body).find((category) => category === name);

    expect(typeof testCategory).toEqual('string');
  });

  test('It should response the DELETE method', async () => {
    const response = await request(server).delete('/category')
      .send({ name });

    expect(response.statusCode).toEqual(HTTP_CODES.OK);
    expect(typeof response.body).toEqual('object');

    const testCategory = Object.keys(response.body).find((category) => category === name);

    expect(testCategory).toBeUndefined();
  });

  test('It should response bad requests with error codes', async () => {
    const postResponse = await request(server).post('/category').send({ name: 'general' });
    const deleteResponse = await request(server).delete('/category').send({ name: 'notFound' });

    expect(postResponse.statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
    expect(deleteResponse.statusCode).toEqual(HTTP_CODES.NOT_FOUND);
  });
});
