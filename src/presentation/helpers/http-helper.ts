import { HttpResponse } from '../protocols/http';
import { ServerError } from '../errors';

const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export { badRequest, serverError, ok };
