var _ = require('lodash');
import { gotResponseBody } from '../../http/gotResponse';
import { ResponseBody, WeeksEntity } from '../../interfaces/ResponseEntities';

export async function getTodayRadioText() {
    const data = await gotResponseBody();
    const today = getToday(data);

    return makeMessage(today)
}

function getToday(data: ResponseBody):WeeksEntity {
    const day = new Date().getDay();
    const today = _.chain(data).get('layers')
        .find({ 'layer': 'weekly' })
        .get('weeks')
        .find({ day: day })
        .value()
    return today;
}

function makeMessage(today: WeeksEntity):string {
  return `${today.title}${today.isviewradio ? '(보라)' : ''}` + '\n' +
    `${today.items[0].title} With. ${today.guest}`;
}

