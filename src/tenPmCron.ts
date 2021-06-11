import { todayRadioService } from './services/todayRadio/todayRadioService';
const moment = require('moment-timezone');

const config = require('dotenv').config()
const runAll = async () => {
    moment.tz.setDefault("Asia/Seoul");
    console.log(moment().format('YYYYMMDD_HHmmss'))
    console.log('----------------------10:PM start--------------------')
    await todayRadioService();
}

runAll()

