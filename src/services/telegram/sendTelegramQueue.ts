import { sendMessage } from "../../util/telegramHelper";
import { clearCollection } from "../db/mongoDbHelper";
import { getTelegram } from "./getTelegram";
import _ from "lodash";

export async function sendTelegramQueue():Promise<void> {
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