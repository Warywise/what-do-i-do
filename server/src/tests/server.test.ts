import request from 'supertest';
import { resolve as resolvePath } from 'path';

import server from '../server';
import HTTP_CODES from '../lib/httpCodes';
import * as Storage from '../lib/handleFile';

export const serverTests = describe('Test the essential server features.', () => {
  test('It should response the GET method at root path', async () => {
    const response = await request(server).get('/');

    expect(response.statusCode).toEqual(HTTP_CODES.OK);
    expect(response.text).toEqual('Veja o ReadMe para rotas disponíveis');
  });

  test('It should throw an Error', async () => {
    const response = await request(server).get('/').send({ error: true });

    expect(response.body).toEqual({ error: 'Erro de teste' });
  });

  test('It should handle the file correctly', () => {
    const path = resolvePath(__dirname, 'tasks_test.json');
    const testFile1 = Storage.READ_FILE(path);

    expect(testFile1).toHaveProperty('general');
    expect(Array.isArray(testFile1.general)).toBeTruthy();
    expect(testFile1.general.length).toBeGreaterThan(0);

    Storage.WRITE_FILE({ test: [] }, path);
    const testFile2 = Storage.READ_FILE(path);

    expect(testFile2).toHaveProperty('test');
    expect(Array.isArray(testFile2.test)).toBeTruthy();
    expect(testFile2.test.length).toEqual(0);

    Storage.WRITE_FILE(testFile1, path);
  });
});
