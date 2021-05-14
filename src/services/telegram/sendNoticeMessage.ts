import { existsSync, fileDelete, readFile } from "../../util/fileHelper"
import { sendMessage } from "../../util/telegramHelper";

export async function sendNoticeMessage() {
    const path = 'resource/telegramTarget/noticeLatest.txt'
    try {
        if(!existsSync(path)){
            return
        }
        const message = readFile(path)
        await sendMessage(message)
        fileDelete(path)
    } catch (error) {
        console.log(error)
    }
}

