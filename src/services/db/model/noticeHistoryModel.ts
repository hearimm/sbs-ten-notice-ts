import { Schema, model } from 'mongoose';
import { NoticeLatest } from './noticeLatestModel';

const schema = new Schema<NoticeLatest>({
    date: { type: String, required: true },
    text: { type: String, required: true },
}, { collection: 'notice_history' });
export const NoticeHistoryModel = model<NoticeLatest>('notice_history', schema);
