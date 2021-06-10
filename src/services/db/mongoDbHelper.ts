import _ from "lodash";
import * as moment from 'moment-timezone'

export async function insertNoticeLatestAndHistory(noticeText: string) {
    const client = await getClient()
    if (!client) { return }

    try {
        const collection = client.db("sbs-ten-notice").collection("notice_latest");
        let res = await collection.findOneAndDelete({});
        const newItem = {
            date : moment().format('YYYYMMDD_HHmmss'),
            text : noticeText
          };
        const result = await collection.insertOne(newItem)
        const historyCollection = client.db("sbs-ten-notice").collection("notice_history");
        const resultHistory = await historyCollection.insertOne(newItem)

        console.log('insert result', result)
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

export async function getNoticeLatest(): Promise<string> {
    const client = await getClient();
    if (!client) { return }

    let res = null
    try {
        const collection = client.db("sbs-ten-notice").collection("notice_latest");
        res = await collection.findOne();
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    const result = _.get(res,'text')
    console.log('getNoticeLatest',result)
    return result
}

async function getClient() {
    const MongoClient = require('mongodb').MongoClient;
    const uri = process.env.MONGO_URI
    try {
        return await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.error(error)
    }
    return null
}

