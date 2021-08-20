import { scheduleTextReaderService } from '../../src/services/scheduleTextReader/scheduleTextReaderService';
import moment from 'moment-timezone';

describe('scheduleTextReaderService', () => {
  process.env.TEST_SUITE = 'scheduleTextReaderService'

  test('should scheduleTextReaderService work 4', async () => {
    /* data
     6/14 (월) 19:30 비연애참피언스리그 with. 박문성 해설위원
               20:30 꼰묘꼰묘해 with. 러블리즈 지애
     6/15 (화) 19:30 말년이 편한 가불판단소 with. 이말년
     6/17 (목) 20:30 요리의 신과함께 with. 승우아빠
    */
    const testJson = await import('../../test_resources/noticeLatest.json');
    const result = await scheduleTextReaderService(testJson.text,moment('20210614','YYYYMMDD').format('YYYYMMDD_HHmmss'))
    expect(result.length).toBe(4)
  });

  test('should scheduleTextReaderService two 2', async () => {
    const testJson = await import('../../test_resources/noticeLatest.json');
    const result = await scheduleTextReaderService(testJson.text,moment('20210615','YYYYMMDD').format('YYYYMMDD_HHmmss'))
    expect(result.length).toBe(2)
  });

  test('should scheduleTextReaderService work 1', async () => {
    const testJson = await import('../../test_resources/noticeLatest.json');
    const result = await scheduleTextReaderService(testJson.text,moment('20210617_2029','YYYYMMDD_HHmm').format('YYYYMMDD_HHmmss'))
    expect(result.length).toBe(1)
  });

  test('should scheduleTextReaderService work 0', async () => {
    const testJson = await import('../../test_resources/noticeLatest.json');
    const result = await scheduleTextReaderService(testJson.text,moment('20210617_2031','YYYYMMDD_HHmm').format('YYYYMMDD_HHmmss'))
    expect(result.length).toBe(0)
  });
});