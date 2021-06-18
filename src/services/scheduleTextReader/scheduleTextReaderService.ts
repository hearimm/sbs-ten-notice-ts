import { clearCollection } from "../db/mongoDbHelper";
import moment from 'moment-timezone';
import { SendTarget, SendTargetModel } from "../db/model/sendTargetModel";
import { Mongoose, connect } from "mongoose";

const monthRegxp = new RegExp(/[0-1]?[0-9]\/[0-3]?[0-9]/);
const timeRegxp = new RegExp(/[0-2]?[0-9]:[0-5]?[0-9]/);

export async function scheduleTextReaderService(noticeText:string):Promise<SendTarget[]> {
    await clearCollection('send_target')
    const array = getScheduleArray(noticeText);
    return await inesrtSendTarget(array)
}

async function inesrtSendTarget(array:Record<string, unknown>[]):Promise<SendTarget[]> {
    let mongoose:Mongoose
    try{
        mongoose = await connect(process.env.MONGO_URI + '/sbs-ten-notice', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const result = await SendTargetModel.insertMany(array)
        return result
    }catch(err){
        throw new Error(err)
    }finally {
        mongoose.connection.close()
    }
}

function getScheduleArray(noticeText: string) {
    const splitData = noticeText.split('\n');
    let month = '';
    let time = '';
    const resultArray:Record<string, unknown>[] = [];

    for (const e of splitData) {
        if (hasMonthText(e)) {
            month = getMonthText(e);
        }
        if (hasTimeText(e)) {
            time = getTimeText(e);
            const m = moment(month + ' ' + time, "M/D HH:mm");
            const text = e.trim();
            resultArray.push({
                time: m.format('YYYYMMDDHHmm'),
                text
            });
        }
    }
    return resultArray
}

function hasMonthText(text: string) {
    return monthRegxp.test(text)
}

function getMonthText(text: string) {
    return monthRegxp.exec(text)[0]
}

function hasTimeText(text: string) {
    return timeRegxp.test(text)
}
function getTimeText(text: string) {
    return timeRegxp.exec(text)[0]
}
