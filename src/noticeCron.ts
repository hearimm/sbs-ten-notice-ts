import { noticeService } from './services/notice/noticeService'
import { scheduleTextReaderService } from './services/scheduleTextReader/scheduleTextReaderService';
import { isNoticeUpdated } from './services/notice/isNoticeUpdated';
import { getNoticeText } from './services/notice/getNoticeText';
import { sendMessage } from './util/telegramHelper';
const moment = require('moment-timezone');

const config = require('dotenv').config()
const runAll = async () => {
    moment.tz.setDefault("Asia/Seoul");
    console.log(moment().format('YYYYMMDD_HHmmss'))
    console.log('----------------------notice start--------------------')
    try {
        const noticeText = await getNoticeText()
        if(!await isNoticeUpdated(noticeText)) { return }

        await noticeService(noticeText);
        await scheduleTextReaderService(noticeText);
        await sendMessage(noticeText)
    } catch (error) {
        console.error(error)
    }
}

runAll()

