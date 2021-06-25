import _ from 'lodash';
import { DeleteWriteOpResultObject, InsertOneWriteOpResult, InsertWriteOpResult, MongoClient, WithId } from 'mongodb';
import { connect as mongooseConnect, Mongoose } from 'mongoose';

export async function insertOne(collectionStr: string, item: Record<string, unknown>) :Promise<InsertOneWriteOpResult<WithId<Record<string, unknown>>>>{
    const client = await getClient()
    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        return await collection.insertOne(item)
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}


export const clearCollection = async (collectionStr: string): Promise<DeleteWriteOpResultObject> => {
    const client = await getClient()
    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        return await collection.deleteMany({})
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
};

export const getCollectionCount = async (collectionStr: string):Promise<number> => {
    const client = await getClient()
    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        const result = await collection.countDocuments({})
        return result
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
};

export const deleteManyById = async (collectionStr: string, ids:string[]):Promise<DeleteWriteOpResultObject> => {
    const client = await getClient()
    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        return await collection.deleteMany({_id: {$in:ids} })
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
};


export async function insertMany(collectionStr: string, items: Record<string, unknown>[]):Promise<InsertWriteOpResult<any>> {
    if(_.isEmpty(items)) return;
    const client = await getClient()
    try {
        const collection = client.db("sbs-ten-notice").collection(collectionStr);
        return await collection.insertMany(items)
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

export async function connect(): Promise<Mongoose> {
    const uri = getConnectionUri()
    console.log('connect uri', uri)
    try{
        return await mongooseConnect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}

export async function getClient():Promise<MongoClient> {
    const uri = getConnectionUri()
    console.log('getClient uri', uri)
    try {
        return await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }
}
 export function getConnectionUri():string {
    let uri = process.env.MONGO_URL 
    if(process.env.TEST_SUITE){
        uri = uri.split('/')
        .slice(0, -1)
        .join('/') + `/${process.env.TEST_SUITE}`
    }
    return uri
 }
