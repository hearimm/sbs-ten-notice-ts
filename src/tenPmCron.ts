import { todayRadioService } from './services/todayRadio/todayRadioService';
import * as moment from 'moment-timezone'

const config = require('dotenv').config()
const runAll = async () => {
    moment.tz.setDefault("Asia/Seoul");
    console.log(moment().format('YYYYMMDD_HHmmss'))
    console.log('----------------------start--------------------')
    await todayRadioService();
}

runAll()

