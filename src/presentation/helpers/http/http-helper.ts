import { HttpResponse } from '../../protocols/http';
import { ServerError, UnauthorizedError } from '../../errors';

const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export {
  badRequest, serverError, ok, unauthorized,
};
