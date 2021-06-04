import { todayRadioService } from './services/todayRadio/todayRadioService';

const config = require('dotenv').config()
const runAll = async () => {
    console.log('----------------------start--------------------')
    await todayRadioService();
}

runAll()

