import { existsSync, fileDelete, fileWrite, readFile } from "../../util/fileHelper"
import moment from 'moment';

const monthRegxp = new RegExp(/[0-1]?[0-9]\/[0-3]?[0-9]/);
const timeRegxp = new RegExp(/[0-2]?[0-9]\:[0-5]?[0-9]/);

export async function scheduleTextReaderService() {
    const noticeText = getNoticeTextFromResource();
    const splitData = noticeText.split('\n')
    let month = ''
    let time = ''
    const resultArray = []
    for (let i = 0; i < splitData.length; i++) {
        const e = splitData[i];
        
        if(hasMonthText(e)){
            month = getMonthText(e)
        }
        if(hasTimeText(e)){
            time = getTimeText(e)
            const m = moment(month+' '+time, "M/D HH:mm")
            const fileName = 'resource/telegramTarget/scheduled/'+m.format('YYYYMMDDHHmm')+ '.txt'
            const text = e.trim()
            console.log(fileName, text)
            fileWrite(fileName, text)
            resultArray.push(text)
        }
    }
    console.log(resultArray)
}

function hasMonthText(text: string) {
    return monthRegxp.test(text)
}

function getMonthText(text: string) {
    return monthRegxp.exec(text)[0]
}

function hasTimeText(text: string) {
    return timeRegxp.test(text)
}
function getTimeText(text: string) {
    return timeRegxp.exec(text)[0]
}

function getNoticeTextFromResource() {
    const path = 'resource/noticeLatest.txt'
    try {
        if(!existsSync(path)){
            return
        }
        const message = readFile(path)
        return message
    } catch (error) {
        console.log(error)
    }
}
