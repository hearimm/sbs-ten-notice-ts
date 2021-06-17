import { insertOne } from "../services/db/mongoDbHelper";
import { clearDir, fileWrite } from "./fileHelper";

export function sendQueue(type: string, data: Record<string,unknown>): void {
    switch (type) {
        case "NOTICE":
            sendTelegramQueue(data)
            sendScheduleQueue(data)
            break;
        case "SCHEDULE_SEND_TARGET":
            sendScheduleSendTargetQueue(data)
            break;

        case "SCHEDULE_TELEGRAM":
            sendScheduleTelegramQueue(data)
            break;
        default:
            throw new Error(`Not type cased sendQueue ${type}`);
    }
}

export function clearQueue(type: string):void {
    switch (type) {
        case "NOTICE":
            throw new Error("Not implement clear queue notice");
        case "SCHEDULE_SEND_TARGET":
            clearSendScheduleTargetQueue()
            break;
        default:
            throw new Error(`Not type cased clearQueue ${type}`);
    }
}


function sendTelegramQueue(data: Record<string,unknown>) {
    fileWrite(`${process.env.TELEGRAM_QUEUE}/noticeLatest.json`, JSON.stringify(data, null, 2));
}
function sendScheduleQueue(data: Record<string,unknown>) {
    fileWrite(`${process.env.SCHEDULE_QUEUE}/noticeLatest.json`, JSON.stringify(data, null, 2));
}
function sendScheduleSendTargetQueue(data: any) {
    // const time = data.time
    // const item = JSON.stringify(data, null, 2);
    // fileWrite(`${process.env.SCHEDULE_SEND_TARGET_QUEUE}/${time}.json`, item);
    insertOne('send_target',data)
}
function sendScheduleTelegramQueue(data: any) {
    const time = data.time
    fileWrite(`${process.env.TELEGRAM_QUEUE}/${time}.json`, JSON.stringify(data, null, 2));
}
function clearSendScheduleTargetQueue() {
    clearDir(process.env.SCHEDULE_SEND_TARGET_QUEUE)
}
