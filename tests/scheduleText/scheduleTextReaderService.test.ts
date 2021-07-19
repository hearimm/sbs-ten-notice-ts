import { scheduleTextReaderService } from '../../src/services/scheduleTextReader/scheduleTextReaderService';

describe('scheduleTextReaderService', () => {
  process.env.TEST_SUITE = 'scheduleTextReaderService'

  test('should scheduleTextReaderService work well', async () => {
    const testJson = await import('../../test_resources/noticeLatest.json');
    const result = await scheduleTextReaderService(testJson.text)
    console.log(result)
    expect(result.length).toBe(4)
  });
});