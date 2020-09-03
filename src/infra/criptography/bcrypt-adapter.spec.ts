import bcrypt from 'bcrypt';
import BcryptAdapter from './bcrypt-adapter';

const HASH_PASSWORD = 'hashed';
const SALT = 12;

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve(HASH_PASSWORD));
  },
}));

const makeSut = (): BcryptAdapter => new BcryptAdapter(SALT);

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(SALT);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT);
  });

  test('Should return a hash on sucess', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe(HASH_PASSWORD);
  });
});
