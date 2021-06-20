import moment from 'moment-timezone';
import { connect, Mongoose } from 'mongoose';
import { NoticeLatest, NoticeLatestModel } from '../db/model/noticeLatestModel';
import { NoticeHistoryModel } from '../db/model/noticeHistoryModel';


export async function insertNoticeLatestAndHistory(noticeText: string):Promise<{ latest: NoticeLatest; history: NoticeLatest; }> {
    let mongoose:Mongoose
    try{
        mongoose = await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        NoticeLatestModel.deleteMany({});
        const newItem = {
            date: moment().format('YYYYMMDD_HHmmss'),
            text: noticeText
        };
        const result = await new NoticeLatestModel(newItem).save()
        const resultHistory = await new NoticeHistoryModel(newItem).save()
        return {latest: result, history: resultHistory}
    }catch(err){
        throw new Error(err)
    }finally {
        mongoose.connection.close()
    }
}
