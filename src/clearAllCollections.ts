import { clearCollection } from './services/db/mongoDbHelper';
import moment from 'moment-timezone';
import dotenv from 'dotenv'
dotenv.config()
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

