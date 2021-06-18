import { NoticeLatest } from "../db/model/noticeLatestModel";
import { insertNoticeLatestAndHistory } from "./insertNoticeLatestAndHistory";
import { isNoticeUpdated } from "./isNoticeUpdated";

export async function noticeService(noticeText: string):Promise<{ latest: NoticeLatest; history: NoticeLatest; }> {
    return await insertNotice(noticeText);
}

const insertNotice = async(noticeText:string) => {
    if (!await isNoticeUpdated(noticeText)) { return }
    return await insertNoticeLatestAndHistory(noticeText)
}


