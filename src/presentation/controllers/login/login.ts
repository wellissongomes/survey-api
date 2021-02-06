/* eslint-disable no-restricted-syntax */
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { EmailValidator } from '../signup/signup-protocols';

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const params = ['email', 'password'];
    for (const param of params) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param));
      }
    }

    const { email } = httpRequest.body;

    const isValidEmail = this.emailValidator.isValid(email);
    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'));
    }
  }
}
