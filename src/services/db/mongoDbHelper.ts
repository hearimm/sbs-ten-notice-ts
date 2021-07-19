import { connect as mongooseConnect, Mongoose } from 'mongoose';

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

export function getConnectionUri():string {
    let uri = process.env.MONGO_URL
    if(process.env.TEST_SUITE){
        uri = uri.split('/')
        .slice(0, -1)
        .join('/') + `/${process.env.TEST_SUITE}`
    }
    return uri
 }
