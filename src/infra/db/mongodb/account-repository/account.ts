import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { AccountModel } from '../../../../domain/models/account';
import MongoHelper from '../helpers/mongo-helper';

export default class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const [account] = result.ops;
    return MongoHelper.map(account);
  }
}
