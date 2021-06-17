import { fileWrite } from '../../util/fileHelper';
import { sendQueue } from '../../util/queueHelper';
import { isNoticeUpdated } from './isNoticeUpdated';
const moment = require('moment-timezone')

export async function writeNoticeTextFile(noticeText: string) { // deprecated
    if (await isNoticeUpdated(noticeText)) {
        fileWrite(`${process.env.NOTICE_HISTORY_DIR_PATH}/noticeLatest${moment().format('_YYYYMMDD_HHmmss')}.txt`, noticeText);
        fileWrite(process.env.NOTICE_LATEST_PATH, noticeText);
        sendQueue("NOTICE", {text: noticeText})
    }
}
