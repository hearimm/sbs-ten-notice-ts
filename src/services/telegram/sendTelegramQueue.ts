import { fileDelete, getJSON, readDir } from "../../util/fileHelper"
import { sendMessage } from "../../util/telegramHelper";

export async function sendTelegramQueue() {
    sendAll()
}

function sendAll() {
    const dirPath = process.env.TELEGRAM_QUEUE
    const data = readDir(dirPath)
    data.forEach( e=> {
        const path = `${dirPath}/${e}`;
        const json = getJSON(path)
        sendMessage(json.text)
        fileDelete(path)
    })
}

