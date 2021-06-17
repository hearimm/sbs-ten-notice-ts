import { htmlToTextWordwrap } from '../../util/htmlToText';
import { gotResponseBody } from '../../http/gotResponse';
import _ from "lodash";
import { ResponseBody } from '../../interfaces/responseEntities';
import { API_URL } from "../../constant/apiUrl";

export async function getNoticeText():Promise<string> {
    const description = await getNoticeLayerDescriptionInvoke();
    return htmlToTextWordwrap(description);
}

const getNoticeLayerDescriptionInvoke = async ():Promise<string> => {
    const data = await gotResponseBody(API_URL);
    return getNoticeLayerDescription(data)
};

export const getNoticeLayerDescription = (data:ResponseBody): string => {
    return _.chain(data).get('layers')
    .find({ 'layer': 'notice' })
    .get('description')
    .value()
}
