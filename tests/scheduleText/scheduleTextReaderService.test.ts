import { MongoClient } from 'mongodb';
import { clearCollection, getCollectionCount } from '../../src/services/db/mongoDbHelper';
import dotenv from "dotenv";
import { scheduleTextReaderService } from '../../src/services/scheduleTextReader/scheduleTextReaderService';

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
    const testJson = await import('../../test_resources/noticeLatest.json');
    const result = await scheduleTextReaderService(testJson.text)
    const cnt = await getCollectionCount('send_target')

    expect(cnt).toBe(result.length)
  });

});

const setupClearCollection = async () => {
  const latest = 'send_target'
  const resultLatest = await clearCollection(latest)
  expect(resultLatest.result.ok).toBe(1)
}