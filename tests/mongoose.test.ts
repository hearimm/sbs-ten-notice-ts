import dotenv from 'dotenv'
import { Schema, model, connect } from 'mongoose';
import { User } from '../src/services/db/model/User';

const schema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});
const UserModel = model<User>('User', schema);

describe('should mongoose work well', () => {
    dotenv.config({ path: '.env.test' })

    test('should mongoose result 1', async () => {
        const doc = new UserModel({
            name: 'Bill',
            email: 'bill@initech.com',
            avatar: 'https://i.imgur.com/dM7Thhn.png'
        });

        const result = await testSomething(doc)
        expect(result === doc).toBe(true)
    });

    test('should delete all', async () => {
        const result = await UserModel.deleteMany()
        expect(result.deletedCount).toBe(1)
    })
})

async function testSomething(doc: User): Promise<User> {

    try {
        return run(doc)
    } catch (err) {
        throw new Error(err)
    }

    async function run(doc: User): Promise<User> {
        await connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const result = await doc.save();
        console.log(doc.email); // 'bill@initech.com'
        return result
    }
}