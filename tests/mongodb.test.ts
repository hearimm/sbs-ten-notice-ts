import { MongoClient } from 'mongodb';
import { clearCollection } from '../src/services/db/mongoDbHelper';
import { insertNoticeLatestAndHistory } from "../src/services/notice/insertNoticeLatestAndHistory";
import dotenv from "dotenv";

describe('mongodb Test', () => {
  dotenv.config({ path: '.env.test' })

  const MONGO_TEST_URI = process.env.MONGO_URI
  let connection: MongoClient;

  beforeAll(async () => {
    connection = await MongoClient.connect(MONGO_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
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
    expect(result.latest.text).toBe('123')
    expect(result.history.text).toBe('123')
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
