import { getNoticeText } from "./getNoticeText";
import { insertNoticeLatestAndHistory } from "../db/mongoDbHelper";
import { writeNoticeTextFile } from "./writeNoticeTextFile";
import { isNoticeUpdated } from "./isNoticeUpdated";

export async function noticeService() {
    const noticeText = await getNoticeText();
    await writeNoticeTextFile(noticeText);
    await insertNotice(noticeText);
}

const insertNotice = async(noticeText:string) => {
    if (!await isNoticeUpdated(noticeText)) { return }
    await insertNoticeLatestAndHistory(noticeText)
}


