var _ = require('lodash');
import axios from 'axios';
import { HttpsProxyAgent } from 'hpagent';
import { gotResponseBody } from '../gotResponse';
import { LayersEntity
    ,LayerItemsEntity
    ,WeeksEntity
    ,WeekItemsEntity } from '../Interfaces';


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