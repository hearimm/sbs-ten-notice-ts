import { scheduleTargetSend } from './services/schedule/scheduleTargetSender';
import { sendTelegramQueue } from './services/telegram/sendTelegramQueue';
const moment = require('moment-timezone');

const config = require('dotenv').config()
const runAll = async () => {
    moment.tz.setDefault("Asia/Seoul");
    console.log(moment().format('YYYYMMDD_HHmmss'))
    console.log('----------------------start--------------------')
    try {
        await scheduleTargetSend();
        await sendTelegramQueue()
    } catch (error) {
        console.error(error)
    }
}

runAll()

