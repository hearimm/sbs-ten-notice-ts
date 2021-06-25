import { connect } from "../db/mongoDbHelper";
import _ from "lodash";
import { ITelegram, TelegramModel } from "../db/model/telegramModel";
import { Mongoose } from "mongoose";
import { SendTargetModel } from "../db/model/sendTargetModel";
import moment from "moment";

export async function scheduleTargetSend(): Promise<Array<ITelegram>> {
  let conn: Mongoose;
  try {
    conn = await connect();
    const sendTargets = await SendTargetModel.find({
        time: { $lte: moment().format('YYYYMMDDHHmm') }
    })
    if(_.isEmpty(sendTargets)) { return [] }
    const result = await TelegramModel.insertMany(sendTargets);
    for (const e of sendTargets) {
      await e.remove();
    }
    return result
  } catch (error) {
    throw new Error(error);
  } finally {
    conn.connection.close();
  }
}
