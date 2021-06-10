import got from 'got';
import { HttpProxyAgent } from 'hpagent';
import { ResponseBody } from '../interfaces/responseEntities';



export const gotResponseBody = async (): Promise<ResponseBody> => {
    try {
        const response = await gotResponse();
        const body: ResponseBody = JSON.parse(response.body);
        return body;
    } catch (error) {
        console.error(error); //=> 'Internal server error'    
        console.error(error.response); //=> 2
    }
};

const gotResponse = async () => {
    try {
        if(process.env.PROXY){
            return gotProxy();
        }
        return got('http://static.apis.sbs.co.kr/program-api/2.0/main/ten')
    } catch (error) {
        console.log(error); //=> 'Internal server error'
        console.log(error.response); //=> 2
    }
};
async function gotProxy() {
    return got('http://static.apis.sbs.co.kr/program-api/2.0/main/ten', {
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

