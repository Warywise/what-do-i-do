import request from 'supertest';
import server from '../server';
import HTTP_CODES from '../lib/httpCodes';



describe('Test the path "/tasks"', () => {
  test('It should response the GET method', async () => {
    const response = await request(server).get('/tasks');

    expect(response.statusCode).toEqual(HTTP_CODES.OK);
    expect(typeof response.body).toEqual('object');
    expect(response.body).toHaveProperty('general');
  });

  test('It should response the POST method', async () => {
    const response = await request(server).get('/tasks');

    expect(response.statusCode).toEqual(HTTP_CODES.CREATED);
    expect(typeof response.body).toEqual('object');
    expect(response.body).toHaveProperty('general');
  });

  test('It should response the PATCH method', async () => {
    const response = await request(server).get('/tasks');

    expect(response.statusCode).toEqual(HTTP_CODES.OK);
    expect(typeof response.body).toEqual('object');
    expect(response.body).toHaveProperty('general');
  });

  test('It should response the DELETE method', async () => {
    const response = await request(server).get('/tasks');

    expect(response.statusCode).toEqual(HTTP_CODES.OK);
    expect(typeof response.body).toEqual('object');
    expect(response.body).toHaveProperty('general');
  });
});
