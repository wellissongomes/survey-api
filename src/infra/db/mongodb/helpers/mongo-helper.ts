import { MongoClient, Collection } from 'mongodb';

const MongoHelper = {
  client: MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect() {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },
};

export default MongoHelper;
