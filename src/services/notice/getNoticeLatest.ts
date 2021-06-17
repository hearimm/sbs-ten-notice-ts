import * as _ from "lodash";
import { getClient } from "../db/mongoDbHelper";


export async function getNoticeLatest(): Promise<string> {    
    const client = await getClient();
    if (!client) { return; }

    let res = null;
    try {
        const collection = client.db("sbs-ten-notice").collection("notice_latest");
        res = await collection.findOne({});
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    const result = _.get(res, 'text');
    return result;
}
