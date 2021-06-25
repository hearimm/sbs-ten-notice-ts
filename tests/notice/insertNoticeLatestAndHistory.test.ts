import { insertNoticeLatestAndHistory } from "../../src/services/notice/insertNoticeLatestAndHistory";


describe('mongodb Test', () => {
  test('should mongodb helper get connection', async () => {
    const result = await insertNoticeLatestAndHistory('123')
    expect(result.latest.text).toBe('123')
    expect(result.history.text).toBe('123')
  });
});
