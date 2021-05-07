var _ = require('lodash');
import axios from 'axios';
import got from 'got';
import { HttpProxyAgent, HttpsProxyAgent } from 'hpagent';

export interface ResponseBody {
    programid: string;
    programcd: string;
    vodid: string;
    category: string;
    broaddate: string;
    production: string;
    copyright: string;
    layers?: (LayersEntity)[] | null;
  }
  export interface LayersEntity {
    type?: string | null;
    layer: string;
    link_url: string;
    target: string;
    isuse: boolean;
    color: string;
    israndom: boolean;
    items?: (LayerItemsEntity | null)[] | null;
    title?: string | null;
    description?: string | null;
    weeks?: (WeeksEntity)[] | null;
  }
  export interface LayerItemsEntity {
    image_url: string;
    image_alt: string;
    link_url: string;
    mediaid: string;
    target: string;
    title: string;
    description: string;
    conttype?: string | null;
    color: string;
    targetage?: number | null;
    imagetype?: string | null;
    titlebold?: boolean | null;
    download_url?: string | null;
    date?: string | null;
  }
  export interface WeeksEntity {
    title: string;
    titlebold: boolean;
    guest: string;
    isviewradio: boolean;
    isviewradio_past: boolean;
    isonair: boolean;
    day: number;
    items?: (WeekItemsEntity)[] | null;
  }
  export interface WeekItemsEntity {
    link_url: string;
    mediaid: string;
    target: string;
    title: string;
  }

const gotResponse = async() => {
    try {       
        return got('http://static.apis.sbs.co.kr/program-api/2.0/main/ten', {
            agent: {
                http: new HttpProxyAgent({
                    keepAlive: true,
                    keepAliveMsecs: 1000,
                    maxSockets: 256,
                    maxFreeSockets: 256,
                    scheduling: 'lifo',
                    proxy: 'http://12.127.21.100:8080'
                    })
            }
        })
    } catch (error) {
        console.log(error);//=> 'Internal server error'    
        console.log(error.response);//=> 2
    }
}

const gotResponseBody = async() => {
    try {
        const response = await gotResponse();
        const body:ResponseBody = JSON.parse(response.body)
        return body
    } catch (error) {
        console.log(error);//=> 'Internal server error'    
        console.log(error.response);//=> 2
    }
}

const htmlToText = (html:string)=>{
    const { htmlToText } = require('html-to-text');

    // const html = '<h1>Hello World</h1>';
    const text = htmlToText(html, {
    wordwrap: 130
    });
    console.log(text); // Hello World
    return text
}

const getNoticeLayer = async() => {
    const data = await gotResponseBody()
    const layers = data.layers
    const noticeLayer:LayersEntity = _.find(layers, { 'layer': 'notice' });
    return noticeLayer
}

const getWeeklyLayer = async() => {
    const data = await gotResponseBody()
    const layers = data.layers
    const weeklyLayer:LayersEntity = _.find(layers, { 'layer': 'weekly' });
    return weeklyLayer
}



async function getTodayRadioText() {
    const weeklyLayer = await getWeeklyLayer();
    const weeks = weeklyLayer.weeks;
    const day = new Date().getDay();
    const today = _.find(weeks, { day: day });
    console.log(
        `${today.title}${today.isviewradio ? '(보라)' : ''}
${today.items[0].title} With. ${today.guest}`);
}

async function getNoticeText() {
    const noticeLayer = await getNoticeLayer();
    return htmlToText(noticeLayer.description);
}

const run = async () => {
    console.log('----------------------start--------------------')
    await getNoticeText();

    await getTodayRadioText();
}

run()