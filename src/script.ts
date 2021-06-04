import { noticeService } from './services/notice/noticeService'
import { scheduleTextReaderService } from './services/scheduleTextReader/scheduleTextReaderService';
import { scheduleTargetSend } from './services/schedule/scheduleTargetSender';
import { sendTelegramQueue } from './services/telegram/sendTelegramQueue';

const config = require('dotenv').config()
const runAll = async () => {
    console.log('----------------------start--------------------')
    await noticeService();
    await scheduleTextReaderService();
    await scheduleTargetSend();
    await sendTelegramQueue();
}

runAll()

