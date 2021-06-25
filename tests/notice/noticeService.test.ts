import { noticeService } from '../../src/services/notice/noticeService';

describe('mongodb Test', () => {

  test('should noticeService work', async () => {
    const testJson = await import('../../test_resources/noticeLatest.json');
    const result = await noticeService(testJson.text)
    expect(result.latest.text).toBe(testJson.text)
    expect(result.history.text).toBe(testJson.text)

    const resultNull = await noticeService(testJson.text)
    expect(resultNull).toBe(undefined)
    });

});