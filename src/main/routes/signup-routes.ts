import { Router } from 'express';
import makeSignUpController from '../factories/signup/signup-factory';
import adaptRoute from '../adapters/express/express-route-adapter';

export default (router: Router): void => {
  const signUpController = makeSignUpController();
  router.post('/signup', adaptRoute(signUpController));
};
