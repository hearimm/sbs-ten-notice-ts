import { Schema, model } from 'mongoose';
import { Document } from 'mongoose';

export interface NoticeLatest extends Document {
    date: string;
    text: string;
}

const schema = new Schema<NoticeLatest>({
    date: { type: String, required: true },
    text: { type: String, required: true },
}, { collection: 'notice_latest' });
export const NoticeLatestModel = model<NoticeLatest>('notice_latest', schema);
