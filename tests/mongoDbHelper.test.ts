import { Db, MongoClient } from 'mongodb';
import { clearCollection, deleteManyById, getCollectionCount, insertMany, insertOne } from '../src/services/db/mongoDbHelper';

describe('mongoDb helper Test', () => {
    const MONGO_TEST_URI = process.env.MONGO_URL
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
      const result = await clearCollection('users');
      expect(result.result.ok).toBe(1)
    });
  
    test('should insertOne', async () => {
      const mockUser = {_id: 'some-user-id', name: 'John'};
      const result = await insertOne('users',mockUser)
      expect(result.result.ok).toBe(1)
    });
  
    test('should insertMany and DeleteMany', async () => {
      const mockUser = [{_id: '1', name: 'John'}, {_id: '2', name: 'John2'}];
      const result = await insertMany('insertMany',mockUser)
      expect(result.result.ok).toBe(1)
      expect(result.insertedCount).toBe(2)

      const insertCount = await getCollectionCount('insertMany')
      expect(insertCount).toBe(2)

      const delResult = await deleteManyById('insertMany', ['1','2'])
      expect(delResult.result.ok).toBe(1)
      expect(delResult.deletedCount).toBe(2)
      const delCount = await getCollectionCount('insertMany')
      expect(delCount).toBe(0)
    });
  
    test('should clear collection after test', async () => {
      const users = db.collection('users');
      const result = await clearCollection('users');
      expect(result.result.ok).toBe(1)
      const count = await users.find({}).count()
      expect(count).toBe(0)
    });
  
  })
  