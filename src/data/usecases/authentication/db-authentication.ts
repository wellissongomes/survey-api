import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication';
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth(authenticationModel: AuthenticationModel): Promise<string> {
    const { email } = authenticationModel;
    await this.loadAccountByEmailRepository.load(email);
    return null;
  }
}
