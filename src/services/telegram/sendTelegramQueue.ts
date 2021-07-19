import { sendMessage } from "../../util/telegramHelper";
import { connect } from "../db/mongoDbHelper";
import _ from "lodash";
import { Mongoose } from "mongoose";
import { ITelegram, TelegramModel } from "../db/model/telegramModel";

export async function sendTelegramQueue():Promise<void> {
    await sendAll()
}

async function sendAll() {
    let conn:Mongoose;
    try {
        conn = await connect();
        const array = await TelegramModel.find({})
        if(_.isEmpty(array)){ return }
        await sendMessages(array);
        await remove(array);
    } catch (error) {
        throw new Error(error);
    }finally{
        conn.connection.close();
    }
}

async function sendMessages(array: ITelegram[]) {
    for (const e of array) {
        await sendMessage(e.text);
    }
}

async function remove(array: ITelegram[]) {
    for (const e of array) {
        await e.remove();
    }
}