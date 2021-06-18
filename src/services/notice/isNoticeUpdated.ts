import _ from "lodash";
import { connect, Mongoose } from 'mongoose';
import { NoticeLatestModel } from '../db/model/noticeLatestModel';

export async function isNoticeUpdated(noticeText: string):Promise<boolean> {
    if(_.isEmpty(noticeText)) { return false }
    const beforeNoticeText = await getNoticeLatest();
    return beforeNoticeText !== noticeText;
}


async function getNoticeLatest(): Promise<string> {
    let mongoose:Mongoose
    try{
        mongoose = await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const result = await NoticeLatestModel.findOne({});
        return _.get(result, 'text')
    }catch(err){
        throw new Error(err)
    }finally {
        mongoose.connection.close()
    }
}
