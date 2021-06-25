import { SendTargetModel } from "../../src/services/db/model/sendTargetModel";
import { connect } from "../../src/services/db/mongoDbHelper";
import { scheduleTargetSend } from "../../src/services/schedule/scheduleTargetSender";
import { Mongoose } from "mongoose";

describe("mongodb Test", () => {
  const MONGO_TEST_URI = process.env.MONGO_URL;
  beforeAll(async () => {
    await afterDelete(MONGO_TEST_URI);
    await beforeInsert(MONGO_TEST_URI)
  });

  afterAll(async () => {
    await afterDelete(MONGO_TEST_URI);
  });

  test("should schedule target send insert items", async () => {
    const result = await scheduleTargetSend();
    expect(result.length).toBe(2);
  });
});

async function beforeInsert(uri: string) {
  let conn:Mongoose;
  try {
    conn = await connect(uri);
    await SendTargetModel.insertMany([
      {
        time: "202106240000",
        text: "test",
      },
      {
        time: "202106240001",
        text: "test",
      },
    ]);
  } catch (error) {
    throw new Error(error);
  } finally {
    conn.connection.close();
  }
}

async function afterDelete(uri: string) {
  let conn:Mongoose;
  try {
    conn = await connect(uri);
    await SendTargetModel.deleteMany({});
  } catch (error) {
    throw new Error(error);
  } finally {
    conn.connection.close();
  }
}


