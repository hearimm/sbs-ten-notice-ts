import { Schema, model } from 'mongoose';
import { Document } from 'mongoose';

export interface SendTarget extends Document {
    time: string;
    text: string;
}

const schema = new Schema<SendTarget>({
    time: { type: String, required: true },
    text: { type: String, required: true },
}, { collection: 'send_target' });
export const SendTargetModel = model<SendTarget>('send_target', schema);
