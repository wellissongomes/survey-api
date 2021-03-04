/* eslint-disable max-len */
import env from '../../config/env';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';
import { LoginController } from '../../../presentation/controllers/login/login-controller';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators';
import { makeLoginValidation } from './login-validation-factory';

const makeLoginController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository();
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository);
  const loginController = new LoginController(dbAuthentication, makeLoginValidation());
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};
