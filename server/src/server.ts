import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import HTTP_CODES from './utils/httpCodes';
import { Container } from '@decorators/di';
import { ERROR_MIDDLEWARE } from '@decorators/express';

const server = express();
server.use(cors());
server.use(express.json());

server.get("/", (_req: Request, res: Response) => {
  if (_req.body.error) throw new Error("Erro de teste");

  res.status(HTTP_CODES.OK).send("Veja o ReadMe para rotas disponíveis");
});

const serverErrorMiddleware = (
  error: Error, _req: Request, res: Response, _next: NextFunction
) => {
  console.log('\n⛔ Error: ', error, '\n');
  return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ error: error?.message ?? error });
};

Container.provide([
  { provide: ERROR_MIDDLEWARE, useValue: serverErrorMiddleware }
]);

server.use(serverErrorMiddleware);

export default server;
