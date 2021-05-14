import { existsSync, fileDelete, readFile } from "../../util/fileHelper"
import TelegramBot from 'node-telegram-bot-api';

export async function sendNoticeMessage() {
    const path = 'resource/noticeLatest.txt'
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

async function sendMessage(message: string) {

    // replace the value below with the Telegram token you receive from @BotFather
    const token = 'YOUR_TELEGRAM_BOT_TOKEN'; // TODO: .env file replace

    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token);
    const chatId = 'YOUR_CHAT_ID' // TODO: .env file replace
    const text = message
    await bot.sendMessage(chatId, text);
    return message
}