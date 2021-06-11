import { deleteManyById, getScheduleToTelegram, insertMany } from "../db/mongoDbHelper";
const _ = require("lodash");

export async function scheduleTargetSend() {
    const array = await getScheduleToTelegram()
    if(_.isEmpty(array)) { return }
    await insertMany('telegram',array)
    await deleteManyById('send_target',_.map(array, (e) => _.get(e,'_id')))
}

