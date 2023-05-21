import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Container } from '@decorators/di';
import { ERROR_MIDDLEWARE } from '@decorators/express';

import Routers from './routers';
import HTTP_CODES from './lib/httpCodes';

const server = express();
console.log('~> Express initialized!');
server.use(cors());
server.use(express.json());
console.log('~> Configs OK.');
server.use(Routers);
console.log('~> Routers registered!');

server.get("/", (_req: Request, res: Response) => {
  if (_req.body.error) throw new Error("Erro de teste");

  res.status(HTTP_CODES.OK).send("Veja o ReadMe para rotas disponíveis");
});

const serverErrorMiddleware = (
  error: Error, _req: Request, res: Response, _next: NextFunction
) => {
  console.log('\n⛔ Error: ', error, '\n');
  return res.status(res.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: error?.message ?? error });
};

Container.provide([
  { provide: ERROR_MIDDLEWARE, useValue: serverErrorMiddleware }
]);

server.use(serverErrorMiddleware);

export default server;
