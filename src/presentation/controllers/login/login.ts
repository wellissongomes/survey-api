/* eslint-disable no-restricted-syntax */
import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const params = ['email', 'password'];
    for (const param of params) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param));
      }
    }
    return new Promise(resolve => resolve(null));
  }
}
