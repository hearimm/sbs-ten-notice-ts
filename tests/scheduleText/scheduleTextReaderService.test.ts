import { MongoClient } from 'mongodb';
import { clearCollection, getConnectionUri } from '../../src/services/db/mongoDbHelper';
import { scheduleTextReaderService } from '../../src/services/scheduleTextReader/scheduleTextReaderService';
import { SendTargetModel } from '../../src/services/db/model/sendTargetModel';
import { connect, Mongoose } from 'mongoose';

describe('scheduleTextReaderService', () => {
  process.env.TEST_SUITE = 'scheduleTextReaderService'
  const MONGO_TEST_URI = getConnectionUri()
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

  test('should scheduleTextReaderService work well', async () => {
    const testJson = await import('../../test_resources/noticeLatest.json');
    const result = await scheduleTextReaderService(testJson.text)
    console.log(result)
    expect(result.length).toBe(4)
  });
});

const setupClearCollection = async () => {
  const latest = 'send_target'
  const resultLatest = await clearCollection(latest)
  expect(resultLatest.result.ok).toBe(1)
}

async function getSendTargets():Promise<number> {
    let mongoose:Mongoose
    try{
        mongoose = await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const result = await SendTargetModel.count({})
        return result
    }catch(err){
        throw new Error(err)
    }finally {
        mongoose.connection.close()
    }
}