import { clearCollection } from './services/db/mongoDbHelper';
const moment = require('moment-timezone');
const config = require('dotenv').config()
const runAll = async () => {
    moment.tz.setDefault("Asia/Seoul");
    console.log(moment().format('YYYYMMDD_HHmmss'))
    console.log('----------------------start--------------------')
    try {
        const arr = [
          clearCollection('notice_latest')
         , clearCollection('notice_history')
         , clearCollection('send_target')
         , clearCollection('telegram')
        ]
        Promise.all(arr)
    } catch (error) {
        console.error(error)
    }
}

runAll()

