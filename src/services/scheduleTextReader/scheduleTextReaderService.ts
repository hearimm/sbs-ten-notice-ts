import { existsSync, fileDelete, fileWrite, readFile } from "../../util/fileHelper"
import { clearQueue, sendQueue } from "../../util/queueHelper";
import * as _ from "lodash";
import { isNoticeUpdated } from "../notice/isNoticeUpdated";
import { getNoticeText } from "../notice/getNoticeText";
import { clearCollection, insertMany } from "../db/mongoDbHelper";
const moment = require('moment-timezone')

const monthRegxp = new RegExp(/[0-1]?[0-9]\/[0-3]?[0-9]/);
const timeRegxp = new RegExp(/[0-2]?[0-9]\:[0-5]?[0-9]/);

export async function scheduleTextReaderService(noticeText:string) {
    await clearCollection('send_target')
    const array = getScheduleArray(noticeText);
    await insertMany('send_target',array);
}

function getScheduleArray(noticeText: string) {
    const splitData = noticeText.split('\n');
    let month = '';
    let time = '';
    const resultArray:object[] = [];

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

function writeScheduleJson(array: any[]) {
    array.forEach(e => {
        const m = moment(e.time, 'YYYYMMDDHHmm');
        if (m.isAfter(moment())) {
            sendQueue('SCHEDULE_SEND_TARGET', e)
        }
    });
}

