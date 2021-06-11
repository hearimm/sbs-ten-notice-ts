import { gotResponseBody } from '../../http/gotResponse';
import { ResponseBody, WeeksEntity } from '../../interfaces/responseEntities';
import { API_URL } from '../../constant/apiUrl'
var _ = require('lodash');
const moment = require('moment-timezone');

export async function getTodayRadioText() {
    const data = await gotResponseBody(API_URL);
    const today = getToday(data);

    return makeMessage(today)
}

function getToday(data: ResponseBody):WeeksEntity {
    const momentDay = parseInt(moment().format('d'), 10)
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

