import { connect } from "../db/mongoDbHelper";
import _ from "lodash";
import { ITelegram, TelegramModel } from "../db/model/telegramModel";
import { Mongoose } from "mongoose";
import { SendTarget, SendTargetModel } from "../db/model/sendTargetModel";
import moment from "moment";

export async function scheduleTargetSend(): Promise<Array<ITelegram>> {
  let conn: Mongoose;
  try {
    conn = await connect();
    const sendTargets = await getSendTargets()
    if(_.isEmpty(sendTargets)) { return [] }
    const result = await TelegramModel.insertMany(sendTargets);
    await removeAll(sendTargets);
    return result
  } catch (error) {
    throw new Error(error);
  } finally {
    conn.connection.close();
  }

  async function getSendTargets() {
    return await SendTargetModel.find({
      time: { $lte: moment().format('YYYYMMDDHHmm') }
    });
  }

  async function removeAll(sendTargets: SendTarget[]) {
    for (const e of sendTargets) {
      await e.remove();
    }
  }
}
