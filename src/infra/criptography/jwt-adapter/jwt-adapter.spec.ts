import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return new Promise(resolve => resolve('token'));
  },
}));

const id = 'any_id';
const JWT_SECRET = 'scret';

const makeSut = (): JwtAdapter => new JwtAdapter(JWT_SECRET);

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt(id);
    expect(signSpy).toHaveBeenCalledWith({ id }, JWT_SECRET);
  });

  test('Should return a token on sign success', async () => {
    const sut = makeSut();
    const accessToken = await sut.encrypt(id);
    expect(accessToken).toBe('token');
  });

  test('Should throw if sign throws', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.encrypt(id);
    expect(promise).rejects.toThrow();
  });
});
