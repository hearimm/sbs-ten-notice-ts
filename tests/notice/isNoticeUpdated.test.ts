import dotenv from 'dotenv'
import { isNoticeUpdated } from '../../src/services/notice/isNoticeUpdated';

describe('mongodb Test', () => {
    dotenv.config({ path: '.env.test' })
    test('should isNoticeUpdated boolean true check', async () => {
        const result = await isNoticeUpdated('123');
        expect(result).toBe(true)
    });

    test('should isNoticeUpdated boolean emptyString false check', async () => {
        const result = await isNoticeUpdated('');
        expect(result).toBe(false)
    });
    test('should isNoticeUpdated boolean undefined false check', async () => {
        const result = await isNoticeUpdated(undefined);
        expect(result).toBe(false)
    });

    test('should isNoticeUpdated boolean null false check', async () => {
        const result = await isNoticeUpdated(null);
        expect(result).toBe(false)
    });
})