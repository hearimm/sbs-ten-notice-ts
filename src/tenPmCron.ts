import { todayRadioService } from './services/todayRadio/todayRadioService';
import moment from 'moment-timezone';

import dotenv from 'dotenv'
dotenv.config()
const runAll = async () => {
    moment.tz.setDefault("Asia/Seoul");
    console.log(moment().format('YYYYMMDD_HHmmss'))
    console.log('----------------------10:PM start--------------------')
    await todayRadioService();
}

runAll()

