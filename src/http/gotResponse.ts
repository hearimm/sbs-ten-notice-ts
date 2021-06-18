import got from 'got';
import { HttpProxyAgent } from 'hpagent';
import { ResponseBody } from '../interfaces/responseEntities';

export const gotResponseBody = async (url: string): Promise<ResponseBody> => {
    try {
        const response = await gotResponse(url);
        const body: ResponseBody = JSON.parse(response.body);
        return body;
    } catch (error) {
        throw new Error(error);
    }
};

const gotResponse = async (url:string) => {
    return process.env.PROXY ? gotProxy(url) : got(url);
};

async function gotProxy(url:string) {
    return got(url, {
            agent: {
                http: new HttpProxyAgent({
                    keepAlive: true,
                    keepAliveMsecs: 1000,
                    maxSockets: 256,
                    maxFreeSockets: 256,
                    scheduling: 'lifo',
                    proxy: process.env.PROXY
                })
            }
        });
}

