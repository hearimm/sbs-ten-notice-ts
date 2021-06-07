import { htmlToText } from '../../util/htmlToText';
import { gotResponseBody } from '../../http/gotResponse';
import _ = require('lodash');

export async function getNoticeText() {
    const description = await getNoticeLayerDescription();
    return htmlToText(description);
}

const getNoticeLayerDescription = async ():Promise<string> => {
    const data = await gotResponseBody();
    return _.chain(data).get('layers')
    .find({ 'layer': 'notice' })
    .get('description')
    .value()
};
