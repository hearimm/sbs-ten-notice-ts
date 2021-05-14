import { fileWrite } from '../../util/fileHelper';
import moment from 'moment';
import { isNoticeUpdated } from './isNoticeUpdated';

export function writeNoticeTextFile(noticeText: string) {
    if (isNoticeUpdated(noticeText)) {
        fileWrite(`resource/history/noticeLatest${moment().format('_YYYYMMDD_HHmmss')}.txt`, noticeText);
        fileWrite('resource/noticeLatest.txt', noticeText);
        fileWrite('resource/telegramTarget/noticeLatest.txt', noticeText);
    }
}
