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

export { badRequest, serverError };
