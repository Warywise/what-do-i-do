import request from 'supertest';
import server from '../server';
import HTTP_CODES from '../lib/httpCodes';

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(server).get('/');

    expect(response.statusCode).toEqual(HTTP_CODES.OK);
    expect(response.text).toEqual('Veja o ReadMe para rotas disponíveis');
  });

  test('It should throw an Error', async () => {
    const response = await request(server).get('/').send({ error: true });

    expect(response.statusCode).toEqual(HTTP_CODES.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({ error: 'Erro de teste' });
  });
});
