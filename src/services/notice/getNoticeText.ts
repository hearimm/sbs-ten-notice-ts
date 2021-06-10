import { htmlToTextWordwrap } from '../../util/htmlToText';
import { gotResponseBody } from '../../http/gotResponse';
import * as _ from "lodash";
import { ResponseBody } from '../../interfaces/responseEntities';

export async function getNoticeText() {
    const description = await getNoticeLayerDescriptionInvoke();
    return htmlToTextWordwrap(description);
}

const getNoticeLayerDescriptionInvoke = async ():Promise<string> => {
    const data = await gotResponseBody();
    return getNoticeLayerDescription(data)
};

export const getNoticeLayerDescription = (data:ResponseBody): string => {
    return _.chain(data).get('layers')
    .find({ 'layer': 'notice' })
    .get('description')
    .value()
}
