import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from './db-authentication-protocols';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(authenticationModel: AuthenticationModel): Promise<string> {
    const { email, password } = authenticationModel;
    const account = await this.loadAccountByEmailRepository.load(email);
    if (account) {
      const { id, password: hashedPassword } = account;
      const equalsPassword = await this.hashComparer.compare(password, hashedPassword);
      if (equalsPassword) {
        const accessToken = await this.encrypter.encrypt(id);
        await this.updateAccessTokenRepository.update(id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}
