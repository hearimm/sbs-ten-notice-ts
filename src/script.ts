import { getTodayRadioText } from './services/todayRadio/getTodayRadioText';
import { getNoticeText } from './services/notice/getNoticeText';

const run = async () => {
    console.log('----------------------start--------------------')
    const noticeText = await getNoticeText();
    console.log(noticeText)

    const todayRadioText = await getTodayRadioText();
    console.log(todayRadioText)
}

run()