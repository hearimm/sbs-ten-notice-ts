import { existsSync, fileDelete, fileWrite, readFile } from "../../util/fileHelper"
import moment from 'moment';
import { clearQueue, sendQueue } from "../../util/queueHelper";
var _ = require('lodash');

const monthRegxp = new RegExp(/[0-1]?[0-9]\/[0-3]?[0-9]/);
const timeRegxp = new RegExp(/[0-2]?[0-9]\:[0-5]?[0-9]/);

export async function scheduleTextReaderService() {
    clearQueue('SCHEDULE_SEND_TARGET')
    const noticeText = getNoticeTextFromResource();
    const array = getScheduleArray(noticeText);
    writeScheduleJson(array)
}

function clearScheduleQueue() {
    clearQueue('SCHEDULE_SEND_TARGET')
}

function getNoticeTextFromResource() {
    const path = 'resource/queue/schedule/noticeLatest.json'
    try {
        if(!existsSync(path)){
            return
        }
        const json = JSON.parse(readFile(path))
        // fileDelete(path) // pop
        return json.text
    } catch (error) {
        console.log(error)
    }
}

function getScheduleArray(noticeText: any) {
    const splitData = noticeText.split('\n');
    let month = '';
    let time = '';
    const resultArray = [];
    for (let i = 0; i < splitData.length; i++) {
        const e = splitData[i];

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


