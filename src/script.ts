import { getTodayRadioText } from './services/todayRadio/getTodayRadioText';
import { getNoticeText } from './services/notice/getNoticeText';
import { writeNoticeTextFile } from './services/notice/writeNoticeTextFile';
import { sendNoticeMessage } from './services/telegram/sendNoticeMessage';

const run = async () => {
    console.log('----------------------start--------------------')
    const noticeText = await getNoticeText();
    writeNoticeTextFile(noticeText);
    sendNoticeMessage();

    const todayRadioText = await getTodayRadioText();
    console.log(todayRadioText)
}

run()
