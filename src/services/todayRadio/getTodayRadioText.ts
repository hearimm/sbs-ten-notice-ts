var _ = require('lodash');
import { gotResponseBody } from '../../http/gotResponse';
import { LayersEntity, WeeksEntity } from '../../interfaces/ResponseEntities';

export async function getTodayRadioText() {
    const weeklyLayer = await getWeeklyLayer();
    const weeks = weeklyLayer.weeks;
    const day = new Date().getDay();
    const today:WeeksEntity = _.find(weeks, { day: day });

    return makeMessage(today)
}

const getWeeklyLayer = async () => {
    const data = await gotResponseBody();
    const layers = data.layers;
    const weeklyLayer: LayersEntity = _.find(layers, { 'layer': 'weekly' });
    return weeklyLayer;
};

function makeMessage(today: WeeksEntity) {
  return `${today.title}${today.isviewradio ? '(보라)' : ''}` + '\n' +
    `${today.items[0].title} With. ${today.guest}`;
}

