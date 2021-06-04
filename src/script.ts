import { todayRadioService } from './services/todayRadio/todayRadioService';
import { noticeService } from './services/notice/noticeService'
import { scheduleTextReaderService } from './services/scheduleTextReader/scheduleTextReaderService';

require('dotenv').config()
const runAll = async () => {
    console.log('----------------------start--------------------')
    // await todayRadioService();
    await noticeService();
    await scheduleTextReaderService();
}

runAll()

