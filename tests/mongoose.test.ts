import { connect, Mongoose } from 'mongoose';
import { NoticeHistoryModel } from '../src/services/db/model/noticeHistoryModel';
import { NoticeLatestModel } from '../src/services/db/model/noticeLatestModel';
import { UserModel } from '../src/services/db/model/userModel';

describe('should mongoose work well', () => {
    let mongoose: Mongoose;
    beforeAll(async () => {
        mongoose = await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    })
    afterAll(() => {
        mongoose.disconnect()
    })

    describe('should User Model work well', () => {
        test('should mongoose save 1', async () => {
            const doc = new UserModel({
                name: 'Bill',
                email: 'bill@initech.com',
                avatar: 'https://i.imgur.com/dM7Thhn.png'
            });

            const result = await doc.save()
            expect(result === doc).toBe(true)
        });

        test('should delete all', async () => {
            const result = await UserModel.deleteMany()
            expect(result.deletedCount).toBe(1)
        })
    })

    describe('should NoticeLatest work well', () => {
        test('should mongoose save 1', async () => {
            const doc = new NoticeLatestModel({
                date: 'Bill',
                text: 'bill@initech.com',
            });
            const result = await doc.save()
            expect(result === doc).toBe(true)
        });

        test('should delete all', async () => {
            const result = await NoticeLatestModel.deleteMany({
                date: 'Bill',
                text: 'bill@initech.com',
            })
            expect(result.deletedCount).toBe(1)
        })
    })

    describe('should Notice history work well', () => {
        test('should mongoose save 1', async () => {
            const doc = new NoticeHistoryModel({
                date: 'Bill',
                text: 'bill@initech.com',
            });
            const result = await doc.save()
            expect(result === doc).toBe(true)
        });

        test('should delete all', async () => {
            const result = await NoticeHistoryModel.deleteMany({
                date: 'Bill',
                text: 'bill@initech.com',
            })
            expect(result.deletedCount).toBe(1)
        })
    })
})