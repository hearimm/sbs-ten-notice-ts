import * as _ from "lodash";
const moment = require('moment-timezone');
import { Db, MongoClient } from 'mongodb';


export async function insertNoticeLatestAndHistory(noticeText: string) {
    const client = await getClient()
    if (!client) { return }

    try {
        const collection = client.db("sbs-ten-notice").collection("notice_latest");
        await collection.findOneAndDelete({});
        const newItem = {
            date: moment().format('YYYYMMDD_HHmmss'),
            text: noticeText
        };
        const result = await collection.insertOne(newItem)
        const historyCollection = client.db("sbs-ten-notice").collection("notice_history");
        const resultHistory = await historyCollection.insertOne(newItem)

        console.log('insert latest result', result.insertedId)
        console.log('insert history result', resultHistory.insertedId)
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

export async function insertOne(collectionStr: string, item: object) {
    const client = await getClient()
    if (!client) { return }

    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        const result = await collection.insertOne(item)
        console.log('insert result ' + collectionStr, result.insertedId)
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}


export const clearCollection = async (collectionStr: string) => {
    const client = await getClient()
    if (!client) { return }

    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        const result = await collection.deleteMany({})
        console.log('clearCollection result '+ collectionStr, result.deletedCount)
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
};

export const getCollectionCount = async (collectionStr: string) => {
    const client = await getClient()
    if (!client) { return }

    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        const result = await collection.countDocuments({})
        console.log('getCollectionCount result '+ collectionStr, result)
        return result
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
};

export const deleteManyById = async (collectionStr: string, ids:string[]) => {
    const client = await getClient()
    if (!client) { return }

    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        const result = await collection.deleteMany({_id: {$in:ids} })
        console.log('deleteManyById result '+ collectionStr, result.deletedCount)
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
};


export async function insertMany(collectionStr: string, items: object[]) {
    const client = await getClient()
    if (!client) { return }

    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        const result = await collection.insertMany(items)
        console.log('insert result ' + collectionStr, result.insertedIds)
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

export const getTelegram = async () => {
    const client = await getClient();
    if(!client) { return }

    let res = null
    try {
        const collection = client.db("sbs-ten-notice").collection("telegram");
        res = await collection.find({}).toArray();
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    console.log('getTelegram', res)
    return res
}

export const getScheduleToTelegram = async () => {
    const client = await getClient();
    if (!client) { return }

    let res = null
    try {
        const collection = client.db("sbs-ten-notice").collection("send_target");
        res = await collection.find({
            time: { $lte: moment().format('YYYYMMDDHHmm') }
        }).toArray();
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    console.log('getScheduleToTelegram', res)
    return res
};


export async function getNoticeLatest(): Promise<string> {
    const client = await getClient();
    if (!client) { return }

    let res = null
    try {
        const collection = client.db("sbs-ten-notice").collection("notice_latest");
        res = await collection.findOne({});
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    const result = _.get(res, 'text')
    return result
}

async function getClient() {
    const uri = _.isNil(process.env.MONGO_TEST_URI) ? process.env.MONGO_URI : process.env.MONGO_TEST_URI
    try {
        return await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}

