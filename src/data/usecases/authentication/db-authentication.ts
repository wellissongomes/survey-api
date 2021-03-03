import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication';
import { HashComparer } from '../../protocols/criptography/hash-comparer';
import { TokenGenerator } from '../../protocols/criptography/token-generator';
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async auth(authenticationModel: AuthenticationModel): Promise<string> {
    const { email, password } = authenticationModel;
    const account = await this.loadAccountByEmailRepository.load(email);
    if (account) {
      const { id, password: hashedPassword } = account;
      const equalsPassword = await this.hashComparer.compare(password, hashedPassword);
      if (equalsPassword) {
        const accessToken = await this.tokenGenerator.generate(id);
        return accessToken;
      }
    }
    return null;
  }
}
