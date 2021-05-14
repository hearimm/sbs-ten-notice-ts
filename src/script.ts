import { noticeService } from './services/notice/noticeService'
import { todayRadioService } from './services/todayRadio/todayRadioService';

const runAll = async () => {
    console.log('----------------------start--------------------')
    await todayRadioService();
    await noticeService();
}

runAll()

