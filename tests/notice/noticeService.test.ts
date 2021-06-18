import { MongoClient } from 'mongodb';
import { clearCollection } from '../../src/services/db/mongoDbHelper';
import { noticeService } from '../../src/services/notice/noticeService';
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
    await setupClearCollection()
  });

  afterAll(async () => {
    await setupClearCollection()
    await connection.close();
  });

  test('should mongodb helper get connection', async () => {
    const result = await noticeService('123')
    expect(result.latest.text).toBe('123')
    expect(result.history.text).toBe('123')
  });

});

const setupClearCollection = async () => {
  const latest = 'notice_latest'
  const resultLatest = await clearCollection(latest)
  expect(resultLatest.result.ok).toBe(1)

  const history = 'notice_history'
  const resulthistory = await clearCollection(history)
  expect(resulthistory.result.ok).toBe(1)
}