import { scheduleTargetSend } from './services/schedule/scheduleTargetSender';
import { sendTelegramQueue } from './services/telegram/sendTelegramQueue';
import moment from 'moment-timezone';

import dotenv from 'dotenv'
dotenv.config()
const runAll = async () => {
    moment.tz.setDefault("Asia/Seoul");
    console.log(moment().format('YYYYMMDD_HHmmss'))
    console.log('----------------------schedule start--------------------')
    try {
        await scheduleTargetSend();
        await sendTelegramQueue()
    } catch (error) {
        console.error(error)
    }
}

runAll()

