import { noticeService } from './services/notice/noticeService'
import { todayRadioService } from './services/todayRadio/todayRadioService';

require('dotenv').config()
const runAll = async () => {
    console.log('----------------------start--------------------')
    await todayRadioService();
    await noticeService();
}

runAll()

