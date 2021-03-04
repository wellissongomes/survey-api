import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';

const id = 'any_id';
const JWT_SECRET = 'scret';

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter(JWT_SECRET);
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt(id);
    expect(signSpy).toHaveBeenCalledWith({ id }, JWT_SECRET);
  });
});
