import _ from "lodash";
import { Db, MongoClient } from 'mongodb';

export async function insertOne(collectionStr: string, item: object) {
    const client = await getClient()
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

export async function getClient() {
    const uri = _.isNil(process.env.MONGO_TEST_URI) ? process.env.MONGO_URI : process.env.MONGO_TEST_URI
    try {
        return await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}

