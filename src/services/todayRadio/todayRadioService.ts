import { getTodayRadioText } from './getTodayRadioText';
import { sendMessage } from '../../util/telegramHelper';

export async function todayRadioService() {
    const todayRadioText = await getTodayRadioText();
    console.log(todayRadioText)
    await sendMessage(todayRadioText)
}
