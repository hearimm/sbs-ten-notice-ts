import { mkdir } from "./util/fileHelper"
const config = require('dotenv').config()

const runAll = async () => {
    const targetDir = [
        process.env.NOTICE_HISTORY_DIR_PATH
        ,process.env.TELEGRAM_QUEUE
        ,process.env.SCHEDULE_QUEUE
        ,process.env.SCHEDULE_SEND_TARGET_QUEUE
    ]
    targetDir.forEach(e => {
        mkdir(e, {recursive: true})
    });
}

runAll()
