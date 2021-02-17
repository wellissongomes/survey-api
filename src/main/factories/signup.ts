/* eslint-disable max-len */
import { Controller } from '../../presentation/protocols/controller';
import SignUpController from '../../presentation/controllers/signup/signup';
import DbAddAccount from '../../data/usecases/add-account/db-add-account';
import BcryptAdapter from '../../infra/criptography/bcrypt-adapter';
import AccountMongoRepository from '../../infra/db/mongodb/account-repository/account';
import { LogControllerDecorator } from '../decorators';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log';
import { makeSignupValidation } from './signup-validation';

const makeSignUpController = (): Controller => {
  const SALT = 12;
  const bcryptAdapter = new BcryptAdapter(SALT);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(dbAddAccount, makeSignupValidation());
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logMongoRepository);
};

export default makeSignUpController;
