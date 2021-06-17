import TelegramBot from 'node-telegram-bot-api';

export async function sendMessage(message: string): Promise<string> {
    try {
        // replace the value below with the Telegram token you receive from @BotFather
        const token = process.env.TELEGRAM_TOKEN;
        // Create a bot that uses 'polling' to fetch new updates
        const bot = new TelegramBot(token);
        const chatId = process.env.TELEGRAM_CHAT_ID;
        const text = message;
        await bot.sendMessage(chatId, text);
        console.log('send telegram message', message)
    } catch (error) {
        console.log(error)
    }
    return message;
}
