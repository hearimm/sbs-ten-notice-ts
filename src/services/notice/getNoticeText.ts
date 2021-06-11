import { htmlToTextWordwrap } from '../../util/htmlToText';
import { gotResponseBody } from '../../http/gotResponse';
import * as _ from "lodash";
import { ResponseBody } from '../../interfaces/responseEntities';

export async function getNoticeText() {
    const description = await getNoticeLayerDescriptionInvoke();
    return htmlToTextWordwrap(description);
}

const getNoticeLayerDescriptionInvoke = async ():Promise<string> => {
    const data = await gotResponseBody('http://static.apis.sbs.co.kr/program-api/2.0/main/ten');
    return getNoticeLayerDescription(data)
};

export const getNoticeLayerDescription = (data:ResponseBody): string => {
    return _.chain(data).get('layers')
    .find({ 'layer': 'notice' })
    .get('description')
    .value()
}
