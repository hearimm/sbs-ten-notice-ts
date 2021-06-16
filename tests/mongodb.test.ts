import { Db, MongoClient } from 'mongodb';
import { clearCollection, getCollectionCount, insertNoticeLatestAndHistory, insertOne } from '../src/services/db/mongoDbHelper';

describe('mongodb Test', () => {
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

  test('should clear notice_latest collection', async () => {
    const collectionName = 'notice_latest'
    await clearCollection(collectionName)
    const count = await getCollectionCount(collectionName)
    expect(count).toBe(0)
  });

  test('should clear notice_history collection', async () => {
    const collectionName = 'notice_history'
    await clearCollection(collectionName)
    const count = await db.collection(collectionName).find({}).count()
    expect(count).toBe(0)
  });

  test('should mongodb helper get connection', async () => {
    await insertNoticeLatestAndHistory('123')
    const result = await db.collection('notice_latest').find({}).count();
    const resultHistory = await db.collection('notice_history').find({}).count();
    expect(result).toBe(1)
    expect(resultHistory).toBe(1)
  });

  test('should clear before test collection', async () => {
    const users = db.collection('users');
    await users.deleteMany({})
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

  test('should clear after test collection', async () => {
    const users = db.collection('users');
    await users.deleteMany({})
    const count = await users.find({}).count()
    expect(count).toBe(0)
  });
});
