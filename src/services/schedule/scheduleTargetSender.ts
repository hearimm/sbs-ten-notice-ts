import moment from "moment";
import { fileDelete, getJSON, readDir } from "../../util/fileHelper";
import { sendQueue } from "../../util/queueHelper";

export function scheduleTargetSend() {
    const dirPath = process.env.SCHEDULE_SEND_TARGET_QUEUE
    const data = readDir(dirPath)    // [ '202105312030.json', '202106012100.json', '202106031930.json' ]
    data.forEach(e => {
        const path = `${dirPath}/${e}`;
        const json = getJSON(path)
        const m = moment(json.time, 'YYYYMMDDHHmm');
        if(m.isBefore(moment())) {
            sendQueue('SCHEDULE_TELEGRAM', json);
            fileDelete(path)
        }
    });
}

