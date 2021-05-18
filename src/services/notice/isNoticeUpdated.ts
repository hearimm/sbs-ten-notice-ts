import { readFile } from '../../util/fileHelper';

export function isNoticeUpdated(noticeText: string) {
    const beforeNoticeText = readFile(process.env.NOTICE_LATEST_PATH);
    return beforeNoticeText !== noticeText;
}
