 import { getNoticeLatest } from '../db/mongoDbHelper';

export async function isNoticeUpdated(noticeText: string) {
    const beforeNoticeText = await getNoticeLatest();
    return beforeNoticeText !== noticeText;
}
