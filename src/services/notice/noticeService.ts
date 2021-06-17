import { insertNoticeLatestAndHistory } from "./insertNoticeLatestAndHistory";
import { isNoticeUpdated } from "./isNoticeUpdated";

export async function noticeService(noticeText: string):Promise<void> {
    await insertNotice(noticeText);
}

const insertNotice = async(noticeText:string) => {
    if (!await isNoticeUpdated(noticeText)) { return }
    await insertNoticeLatestAndHistory(noticeText)
}


