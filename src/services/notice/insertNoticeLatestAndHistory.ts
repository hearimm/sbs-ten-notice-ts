import moment from 'moment-timezone';
import { InsertOneWriteOpResult } from 'mongodb';
import { getClient } from "../db/mongoDbHelper";

export async function insertNoticeLatestAndHistory(noticeText: string):Promise<{ latest: InsertOneWriteOpResult<any>; history: InsertOneWriteOpResult<any>; }> {
    const client = await getClient();

    try {
        const collection = client.db("sbs-ten-notice").collection("notice_latest");
        await collection.findOneAndDelete({});
        const newItem = {
            date: moment().format('YYYYMMDD_HHmmss'),
            text: noticeText
        };
        const result = await collection.insertOne(newItem);
        const historyCollection = client.db("sbs-ten-notice").collection("notice_history");
        const resultHistory = await historyCollection.insertOne(newItem);

        return {latest: result, history: resultHistory}
    } catch (err) {
        console.log(err);
        throw new Error(err);
    } finally {
        client.close();
    }
}
