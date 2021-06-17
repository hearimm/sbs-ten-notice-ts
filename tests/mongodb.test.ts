import { Db, MongoClient } from 'mongodb';
import { clearCollection, getCollectionCount } from '../src/services/db/mongoDbHelper';
import { insertNoticeLatestAndHistory } from "../src/services/notice/insertNoticeLatestAndHistory";

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

  test('should clear collection notice_latest test before', async () => {
    const collectionName = 'notice_latest'
    await clearCollection(collectionName)
    const count = await getCollectionCount(collectionName)
    expect(count).toBe(0)
  });

  test('should clear collection notice_history test before', async () => {
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

  test('should clear collection notice_latest test after', async () => {
    const collectionName = 'notice_latest'
    await clearCollection(collectionName)
    const count = await getCollectionCount(collectionName)
    expect(count).toBe(0)
  });

  test('should clear collection notice_history test after', async () => {
    const collectionName = 'notice_history'
    await clearCollection(collectionName)
    const count = await db.collection(collectionName).find({}).count()
    expect(count).toBe(0)
  });
});
