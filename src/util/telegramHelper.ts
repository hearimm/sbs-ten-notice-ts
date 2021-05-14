import TelegramBot from 'node-telegram-bot-api';

export async function sendMessage(message: string) {
    try {
        // replace the value below with the Telegram token you receive from @BotFather
        const token = 'YOUR_TELEGRAM_BOT_TOKEN'; // TODO: .env file replace
        // Create a bot that uses 'polling' to fetch new updates
        const bot = new TelegramBot(token);
        const chatId = 'YOUR_CHAT_ID'; // TODO: .env file replace
        const text = message;
        await bot.sendMessage(chatId, text);
    } catch (error) {
        console.log(error)
    }
    
    return message;
}
