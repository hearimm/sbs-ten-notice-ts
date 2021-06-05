var _ = require('lodash');
import { gotResponseBody } from '../../http/gotResponse';
import { ResponseBody, WeeksEntity } from '../../interfaces/responseEntities';
import * as moment from 'moment-timezone'

export async function getTodayRadioText() {
    const data = await gotResponseBody();
    const today = getToday(data);

    return makeMessage(today)
}

function getToday(data: ResponseBody):WeeksEntity {
    const day = new Date().getDay();
    const momentDay = parseInt(moment().format('d') + 0)
    const today = _.chain(data).get('layers')
        .find({ 'layer': 'weekly' })
        .get('weeks')
        .find({ day: momentDay })
        .value()
    return today;
}

function makeMessage(today: WeeksEntity):string {
  return `${today.title}${today.isviewradio ? '(보라)' : ''}` + '\n' +
    `${today.items[0].title} With. ${today.guest}`;
}

