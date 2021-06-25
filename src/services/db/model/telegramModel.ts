import { Schema, model } from 'mongoose';
import { Document } from 'mongoose';

export interface ITelegram extends Document {
    time: string;
    text: string;
}

const schema = new Schema<ITelegram>({
    time: { type: String, required: true },
    text: { type: String, required: true },
}, { collection: 'telegram' });
export const TelegramModel = model<ITelegram>('telegram', schema);
