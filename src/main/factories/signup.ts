import { Controller } from '../../presentation/protocols/controller';
import SignUpController from '../../presentation/controllers/signup/signup';
import EmailValidatorAdapter from '../../utils/email-validator-adapter';
import DbAddAccount from '../../data/usecases/add-account/db-add-account';
import BcryptAdapter from '../../infra/criptography/bcrypt-adapter';
import AccountMongoRepository from '../../infra/db/mongodb/account-repository/account';
import { LogControllerDecorator } from '../decorators';

const makeSignUpController = (): Controller => {
  const SALT = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(SALT);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount);
  return new LogControllerDecorator(signUpController);
};

export default makeSignUpController;
