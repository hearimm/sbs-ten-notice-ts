import { fileDelete, getJSON, readDir } from "../../util/fileHelper";
import { sendQueue } from "../../util/queueHelper";
import { getScheduleToTelegram, insertMany } from "../db/mongoDbHelper";
const moment = require('moment-timezone')

export async function scheduleTargetSend() {
    const array = await getScheduleToTelegram()
    await insertMany('telegram',array)
}

