import { sendMessage } from "../../util/telegramHelper";
import { clearCollection, getTelegram } from "../db/mongoDbHelper";
const _ = require("lodash");

export async function sendTelegramQueue() {
    await sendAll()
}

async function sendAll() {
    const array = await getTelegram()
    if(_.isEmpty(array)){ return }
    for (const e of array) {
        await sendMessage(e.text)
    }
    await clearCollection('telegram')
}