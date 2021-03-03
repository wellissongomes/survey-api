import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication';
import { HashComparer } from '../../protocols/criptography/hash-comparer';
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
  ) {}

  async auth(authenticationModel: AuthenticationModel): Promise<string> {
    const { email, password } = authenticationModel;
    const account = await this.loadAccountByEmailRepository.load(email);
    if (account) {
      const hashedPassword = account.password;
      await this.hashComparer.compare(password, hashedPassword);
    }
    return null;
  }
}
