import { sendNoticeMessage } from "../telegram/sendNoticeMessage";
import { getNoticeText } from "./getNoticeText";
import { writeNoticeTextFile } from "./writeNoticeTextFile";

export async function noticeService() {
    const noticeText = await getNoticeText();
    await writeNoticeTextFile(noticeText);
    sendNoticeMessage();
}