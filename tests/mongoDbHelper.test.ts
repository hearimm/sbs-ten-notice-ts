import { Db, MongoClient } from 'mongodb';
import { clearCollection, deleteManyById, getCollectionCount, insertMany, insertOne } from '../src/services/db/mongoDbHelper';

describe('mongoDb helper Test', () => {
    require('dotenv').config()
  
    const MONGO_TEST_URI = process.env.MONGO_TEST_URI
    const MONGO_DB_NAME = 'sbs-ten-notice'
    let connection: MongoClient;
    let db: Db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(MONGO_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      db = connection.db(MONGO_DB_NAME);
    });
  
    afterAll(async () => {
      await connection.close();
    });
  
    test('should clear collection before test', async () => {
      const users = db.collection('users');
      await clearCollection('users');
      const count = await users.find({}).count()
      expect(count).toBe(0)
    });
  
    test('should insertOne', async () => {
      const mockUser = {_id: 'some-user-id', name: 'John'};
      await insertOne('users',mockUser)
      const users = db.collection('users');
      const insertedUser = await users.findOne({_id: 'some-user-id'});
      expect(insertedUser).toEqual(mockUser);
    });
  
    test('should insertMany and DeleteMany', async () => {
      const mockUser = [{_id: '1', name: 'John'}, {_id: '2', name: 'John2'}];
      await insertMany('insertMany',mockUser)
  
      const insertCount = await getCollectionCount('insertMany')
      expect(insertCount).toBe(2)
  
      await deleteManyById('insertMany', ['1','2'])
      const delCount = await getCollectionCount('insertMany')
      expect(delCount).toBe(0)
    });
  
    test('should clear collection after test', async () => {
      const users = db.collection('users');
      await clearCollection('users');
      const count = await users.find({}).count()
      expect(count).toBe(0)
    });
  
  })
  