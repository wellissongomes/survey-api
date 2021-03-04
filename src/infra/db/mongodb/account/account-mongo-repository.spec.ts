/* eslint-disable no-underscore-dangle */
import { Collection } from 'mongodb';
import MongoHelper from '../helpers/mongo-helper';
import AccountMongoRepository from './account-mongo-repository';

const makeSut = (): AccountMongoRepository => new AccountMongoRepository();
let accountCollection: Collection;

describe('Account mongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });
  test('Should return an account on add success', async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@email.com');
    expect(account.password).toBe('any_password');
  });

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut();
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });
    const account = await sut.loadByEmail('any_email@email.com');
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@email.com');
    expect(account.password).toBe('any_password');
  });

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut();
    const account = await sut.loadByEmail('any_email@email.com');
    expect(account).toBeFalsy();
  });

  test('Should update the account accessToken on updateAccessToken sucess', async () => {
    const sut = makeSut();
    const result = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });
    expect(result.ops[0].accessToken).toBeFalsy();
    const id = result.ops[0]._id;
    await sut.updateAccessToken(id, 'any_token');
    const account = await accountCollection.findOne({ _id: id });
    expect(account).toBeTruthy();
    expect(account.accessToken).toBe('any_token');
  });
});
