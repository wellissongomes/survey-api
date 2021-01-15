import { Controller } from '../../presentation/protocols/controller';
import SignUpController from '../../presentation/controllers/signup/signup';
import EmailValidatorAdapter from '../../utils/email-validator-adapter';
import DbAddAccount from '../../data/usecases/add-account/db-add-account';
import BcryptAdapter from '../../infra/criptography/bcrypt-adapter';
import AccountMongoRepository from '../../infra/db/mongodb/account-repository/account';
import { LogControllerDecorator } from '../decorators';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log';

const makeSignUpController = (): Controller => {
  const SALT = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(SALT);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount);
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logMongoRepository);
};

export default makeSignUpController;
