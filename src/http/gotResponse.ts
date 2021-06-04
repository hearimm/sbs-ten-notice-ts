import got from 'got';
import { HttpProxyAgent } from 'hpagent';
import { ResponseBody } from '../Interfaces/ResponseEntities';

const gotResponse = async () => {
    try {
        return got('http://static.apis.sbs.co.kr/program-api/2.0/main/ten')
        // return got('http://static.apis.sbs.co.kr/program-api/2.0/main/ten', {
        //     agent: {
        //         // http: new HttpProxyAgent({
        //         //     keepAlive: true,
        //         //     keepAliveMsecs: 1000,
        //         //     maxSockets: 256,
        //         //     maxFreeSockets: 256,
        //         //     scheduling: 'lifo',
        //         //     proxy: 'http://12.127.21.100:8080'
        //         // })
        //     }
        // });
    } catch (error) {
        console.log(error); //=> 'Internal server error'    
        console.log(error.response); //=> 2
    }
};

export const gotResponseBody = async () => {
    try {
        const response = await gotResponse();
        const body: ResponseBody = JSON.parse(response.body);
        return body;
    } catch (error) {
        console.log(error); //=> 'Internal server error'    
        console.log(error.response); //=> 2
    }
};
