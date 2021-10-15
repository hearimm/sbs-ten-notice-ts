import moment from 'moment-timezone';
import { SendTarget, SendTargetModel } from "../db/model/sendTargetModel";
import { Mongoose, connect } from "mongoose";
import _ from "lodash";

const monthRegxp = new RegExp(/[0-1]?[0-9]\/[0-3]?[0-9]/);
const timeRegxp = new RegExp(/[0-2]?[0-9]:[0-5]?[0-9]/);

export async function scheduleTextReaderService(noticeText:string, krTime:string):Promise<SendTarget[]> {
    const scheduleArray = getScheduleArray(noticeText);
    const afterScheduleArray = _.filter(scheduleArray, o => { return moment(o.time,'YYYYMMDDHHmm').isAfter(moment(krTime,'YYYYMMDD_HHmmss')) })
    return await clearAfterInesrtSendTarget(afterScheduleArray)
}

async function clearAfterInesrtSendTarget(array:Record<string, unknown>[]):Promise<SendTarget[]> {
    let mongoose:Mongoose
    try{
        mongoose = await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await SendTargetModel.deleteMany({})
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
            resultArray.push({
                time: getDateTimeText(month, time),
                text: e.trim()
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

function getDateTimeText(month: string, time:string) {
    const m = moment(month + ' ' + time, "M/D HH:mm");
    if(isAM(m)) {
        m.add(12,'h');
    }
    return m.format('YYYYMMDDHHmm');
}
function isAM(momentObj) {
    return momentObj.format('A') === 'AM';
}