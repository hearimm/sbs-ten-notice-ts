var _ = require('lodash');
import { htmlToText } from '../../util/htmlToText';
import { gotResponseBody } from '../../http/gotResponse';
import { LayersEntity } from '../../interfaces/ResponseEntities';

export async function getNoticeText() {
    const noticeLayer = await getNoticeLayer();
    return htmlToText(noticeLayer.description);
}

const getNoticeLayer = async () => {
    const data = await gotResponseBody();
    const layers = data.layers;
    const noticeLayer: LayersEntity = _.find(layers, { 'layer': 'notice' });
    return noticeLayer;
};
