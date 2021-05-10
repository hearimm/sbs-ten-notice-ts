import { getTodayRadioText } from './services/todayRadio/getTodayRadioText';
import { getNoticeText } from './services/notice/getNoticeText';
import { fileWrite, readFile } from './util/fileWrite';
import moment from 'moment';

const run = async () => {
    console.log('----------------------start--------------------')
    const noticeText = await getNoticeText();
    console.log(noticeText)
    const beforeNoticeText = readFile('/resource/noticeLatest.txt')
    
    if (beforeNoticeText !== noticeText) {
        //send message
        fileWrite(`/resource/history/noticeLatest${moment().format('_YYYYMMDD_HHmmss')}.txt`, noticeText)
    }
    fileWrite('/resource/noticeLatest.txt', noticeText)

    const todayRadioText = await getTodayRadioText();
    console.log(todayRadioText)
}

run()