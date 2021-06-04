import { fileWrite } from '../../util/fileHelper';
import { sendQueue } from '../../util/queueHelper';
import moment from 'moment';
import { isNoticeUpdated } from './isNoticeUpdated';

export async function writeNoticeTextFile(noticeText: string) {
    if (isNoticeUpdated(noticeText)) {
        
        fileWrite(`${process.env.NOTICE_HISTORY_DIR_PATH}/noticeLatest${moment().format('_YYYYMMDD_HHmmss')}.txt`, noticeText);
        fileWrite(process.env.NOTICE_LATEST_PATH, noticeText);
        fileWrite(process.env.NOTICE_TELEGRAM_TARGET_PATH, noticeText);
        sendQueue("NOTICE", {text: noticeText})
    }
}
