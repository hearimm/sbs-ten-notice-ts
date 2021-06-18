import { NoticeLatest } from "../db/model/noticeLatestModel";
import { insertNoticeLatestAndHistory } from "./insertNoticeLatestAndHistory";
import { isNoticeUpdated } from "./isNoticeUpdated";

export async function noticeService(noticeText: string):Promise<{ latest: NoticeLatest; history: NoticeLatest; }> {
    if (!await isNoticeUpdated(noticeText)) { return }
    return await insertNoticeLatestAndHistory(noticeText)
}


