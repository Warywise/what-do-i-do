import request from 'supertest';
import server from '../server';

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(server).get('/');

    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Veja o ReadMe para rotas disponíveis');
  });

  test('It should throw an Error', async () => {
    const response = await request(server).get('/').send({ error: true });

    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual({ error: 'Erro de teste' });
  });
});
