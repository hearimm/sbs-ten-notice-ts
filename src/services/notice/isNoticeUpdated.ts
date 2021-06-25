import _ from "lodash";
import { Mongoose } from 'mongoose';
import { NoticeLatestModel } from '../db/model/noticeLatestModel';
import { connect } from "../db/mongoDbHelper";

export async function isNoticeUpdated(noticeText: string):Promise<boolean> {
    if(_.isEmpty(noticeText)) { return false }
    const beforeNoticeText = await getNoticeLatest();
    const result = beforeNoticeText !== noticeText;
    if(result){
        console.log('beforeNoticeText >> \n',beforeNoticeText)
    }
    return result;
}


async function getNoticeLatest(): Promise<string> {
    let mongoose:Mongoose
    try{
        mongoose = await connect();
        const result = await NoticeLatestModel.findOne({});
        return _.get(result, 'text')
    }catch(err){
        throw new Error(err)
    }finally {
        mongoose.connection.close()
    }
}
