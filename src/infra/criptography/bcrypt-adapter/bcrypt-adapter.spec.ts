import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

const HASHED_PASSWORD = 'hashed';
const SALT = 12;

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve(HASHED_PASSWORD));
  },

  async compare(): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  },
}));

const makeSut = (): BcryptAdapter => new BcryptAdapter(SALT);

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT);
  });

  test('Should return a valid hash on hash sucess', async () => {
    const sut = makeSut();
    const hash = await sut.hash('any_value');
    expect(hash).toBe(HASHED_PASSWORD);
  });

  test('Should throw if hash throws', () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const promise = sut.hash('any_value');
    expect(promise).rejects.toThrow();
  });

  test('Should call compare with correct values', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', HASHED_PASSWORD);
    expect(compareSpy).toHaveBeenCalledWith('any_value', HASHED_PASSWORD);
  });

  test('Should return true when compare succeeds', async () => {
    const sut = makeSut();
    const isValid = await sut.compare('any_value', HASHED_PASSWORD);
    expect(isValid).toBe(true);
  });

  test('Should return false when compare fails', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const isValid = await sut.compare('any_value', HASHED_PASSWORD);
    expect(isValid).toBe(false);
  });

  test('Should throw if compare throws', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const promise = sut.compare('any_value', HASHED_PASSWORD);
    expect(promise).rejects.toThrow();
  });
});
