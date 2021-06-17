import { Db, MongoClient } from 'mongodb';
import { clearCollection, getCollectionCount } from '../src/services/db/mongoDbHelper';
import { insertNoticeLatestAndHistory } from "../src/services/notice/insertNoticeLatestAndHistory";
import dotenv from "dotenv";

describe('mongodb Test', () => {
  dotenv.config({ path: '.env.test' })

  const MONGO_TEST_URI = process.env.MONGO_URI
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
    const result = await clearCollection(collectionName)
    expect(result.result.ok).toBe(1)
  });

  test('should clear collection notice_history test before', async () => {
    const collectionName = 'notice_history'
    const result = await clearCollection(collectionName)
    expect(result.result.ok).toBe(1)
  });

  test('should mongodb helper get connection', async () => {
    const result = await insertNoticeLatestAndHistory('123')
    expect(result.latest.insertedCount).toBe(1)
    expect(result.history.insertedCount).toBe(1)
  });

  test('should clear collection notice_latest test after', async () => {
    const collectionName = 'notice_latest'
    const result = await clearCollection(collectionName)
    expect(result.deletedCount).toBe(1)
  });

  test('should clear collection notice_history test after', async () => {
    const collectionName = 'notice_history'
    const result = await clearCollection(collectionName)
    expect(result.deletedCount).toBe(1)
  });
});
