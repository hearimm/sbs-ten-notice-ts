import { SendTargetModel } from "../../src/services/db/model/sendTargetModel";
import { connect } from "../../src/services/db/mongoDbHelper";
import { scheduleTargetSend } from "../../src/services/schedule/scheduleTargetSender";
import { Mongoose } from "mongoose";

describe("mongodb Test", () => {
  process.env.TEST_SUITE = 'scheduleTargetSender-test'

  test("should empty schedule target result empty", async () => {
    const result = await scheduleTargetSend();
    expect(result.length).toBe(0);
  });

  test("should schedule target send insert items", async () => {
    await beforeInsert()
    const result = await scheduleTargetSend();
    expect(result.length).toBe(2);
  });
});

async function beforeInsert() {
  let conn:Mongoose;
  try {
    conn = await connect();
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



