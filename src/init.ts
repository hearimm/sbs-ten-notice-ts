import { mkdir } from "./util/fileHelper"
import dotenv from 'dotenv'
dotenv.config()

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
