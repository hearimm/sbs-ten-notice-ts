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

  test('should change am to pm', async () => {
    /* data
      10/11(월) 오후 7:30 마술의 신과 함께 with. 최현우
                오후 9:00 아재판독기 시즌2 with. 윤태진
      10/14(목) 오후 7:30 말년이 편한 가불판단소 with. 이말년
      10/15(금) 오후 9:30 인방타임 쟤잘쟤잘 with. 러블리즈 지애
    */
    function getDateTimeText(month: string, time:string) {
      const m = moment(month + ' ' + time, "M/D HH:mm");
      if(isAM(m)) {
        m.add(12,'h');
      }
      return m.format('YYYYMMDDHHmm');
    }
    function isAM(momentObj) {
      return momentObj.format('A') === 'AM';
    }

    expect(getDateTimeText('10/11', '7:30')).toBe('202110111930')
    expect(getDateTimeText('10/11', '9:00')).toBe('202110112100')
    expect(getDateTimeText('10/14', '7:30')).toBe('202110141930')
    expect(getDateTimeText('10/15', '9:30')).toBe('202110152130')

    expect(getDateTimeText('10/11', '19:30')).toBe('202110111930')
    expect(getDateTimeText('10/11', '21:00')).toBe('202110112100')
    expect(getDateTimeText('10/14', '19:30')).toBe('202110141930')
    expect(getDateTimeText('10/15', '21:30')).toBe('202110152130')
  });
});