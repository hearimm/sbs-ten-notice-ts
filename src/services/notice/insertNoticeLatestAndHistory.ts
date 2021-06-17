const moment = require('moment-timezone');
import { getClient } from "../db/mongoDbHelper";

export async function insertNoticeLatestAndHistory(noticeText: string) {
    const client = await getClient();
    if (!client) { return; }

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

        console.log('insert latest result', result.insertedId);
        console.log('insert history result', resultHistory.insertedId);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    } finally {
        client.close();
    }
}
