import { readFile } from '../../util/fileHelper';

export function isNoticeUpdated(noticeText: string) {
    const beforeNoticeText = readFile('resource/noticeLatest.txt');
    return beforeNoticeText !== noticeText;
}
