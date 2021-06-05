import { noticeService } from './services/notice/noticeService'
import { scheduleTextReaderService } from './services/scheduleTextReader/scheduleTextReaderService';
import { scheduleTargetSend } from './services/schedule/scheduleTargetSender';
import { sendTelegramQueue } from './services/telegram/sendTelegramQueue';
import * as moment from 'moment-timezone'

const config = require('dotenv').config()
const runAll = async () => {
    moment.tz.setDefault("Asia/Seoul");
    console.log(moment().format('YYYYMMDD_HHmmss'))
    // todo : makedir
    console.log('----------------------start--------------------')
    await noticeService();
    await scheduleTextReaderService();
    await scheduleTargetSend();
    await sendTelegramQueue();
}

runAll()

