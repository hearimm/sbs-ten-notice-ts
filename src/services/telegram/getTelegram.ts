import { getClient } from "../db/mongoDbHelper";

export const getTelegram = async () => {
    const client = await getClient();
    if (!client) { return; }

    let res = null;
    try {
        const collection = client.db("sbs-ten-notice").collection("telegram");
        res = await collection.find({}).toArray();
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    console.log('getTelegram', res);
    return res;
};
