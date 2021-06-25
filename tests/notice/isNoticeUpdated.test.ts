import { isNoticeUpdated } from '../../src/services/notice/isNoticeUpdated';

describe('isNoticeUpdated', () => {
    process.env.TEST_SUITE = 'isNoticeUpdated'
    test('should isNoticeUpdated boolean true check', async () => {
        const result = await isNoticeUpdated('blahbalh');
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