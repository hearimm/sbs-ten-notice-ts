import { insertNoticeLatestAndHistory } from "../../src/services/notice/insertNoticeLatestAndHistory";


describe('insertNoticeLatestAndHistory', () => {
  process.env.TEST_SUITE = 'insertNoticeLatestAndHistory'
  test('should mongodb helper get connection', async () => {
    const result = await insertNoticeLatestAndHistory('123')
    expect(result.latest.text).toBe('123')
    expect(result.history.text).toBe('123')
  });
});
