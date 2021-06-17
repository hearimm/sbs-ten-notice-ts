const moment = require('moment-timezone');
import { getClient } from "../db/mongoDbHelper";


export const getScheduleToTelegram = async () => {
    const client = await getClient();
    if (!client) { return; }

    let res = null;
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
    console.log('getScheduleToTelegram', res);
    return res;
};
