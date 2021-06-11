import { getNoticeLayerDescription, getNoticeText } from "../src/services/notice/getNoticeText";

test('should getNoticeText not html', async () => {
    const result = await getNoticeText()
    expect(result).toMatch(/배텐/)
    expect(result).not.toMatch(/<p>/)
});

test('get description', () => {
    const testJson = require('../test_resources/test.json');
    const desc = getNoticeLayerDescription(testJson)
    expect(desc).toBe("<b><span style=\"font-size:10pt\"><span style=\"color:rgb(239, 0, 124);font-family:Malgun Gothic, 굴림, Gulim, Arial;font-size:11pt\"><a href=\"https://programs.sbs.co.kr/radio/ten/boards/57955\" target=\"_self\"><span style=\"color:rgb(239, 0, 124);font-family:Malgun Gothic, 굴림, Gulim, Arial;font-size:11pt\">↳ [이벤트 신청 바로가기]</span></a> </span></span><span style=\"font-size:11pt\"><span style=\"font-size:10pt\"><span style=\"color:rgb(0, 117, 200)\"><span style=\"color:rgb(239, 0, 124);font-family:Malgun Gothic, 굴림, Gulim, Arial;font-size:11pt\"> </span></span></span></span></b><p><b><span style=\"font-size:11pt\"><span style=\"font-size:10pt\"><span style=\"color:rgb(239, 0, 124)\"><br /></span></span></span></b></p><p><b><span style=\"font-size:11pt\"><span style=\"font-size:10pt\"><span style=\"color:rgb(239, 0, 124)\"></span></span><span style=\"color:rgb(239, 0, 124);font-family:Malgun Gothic, 굴림, Gulim, Arial;font-size:11pt\"> </span></span></b></p><p><b><span style=\"font-size:10pt\"><span style=\"color:rgb(255, 170, 0)\"><a href=\"https://www.instagram.com/sbs_ten/\" target=\"_self\"><span style=\"color:rgb(255, 170, 0);font-family:Malgun Gothic, 굴림, Gulim, Arial;font-size:11pt\">[배텐 인스타그램 바로가기]</span></a></span></span></b></p><p><b><span style=\"font-size:10pt\"><span style=\"color:rgb(255, 170, 0)\"><a href=\"https://www.instagram.com/sbs_ten/\" target=\"_self\"><span style=\"color:rgb(255, 170, 0);font-family:Malgun Gothic, 굴림, Gulim, Arial;font-size:11pt\">└ @sbs_ten</span></a></span></span></b></p><p><b><span style=\"font-family:Malgun Gothic, 굴림, Gulim, Arial;font-size:11pt\"> </span></b></p><p><span style=\"font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial;font-size:11pt\">&lt;카카오TV 생녹방일정&gt;　　　　</span></p><p><b><span style=\"font-size:10pt\"><span style=\"font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial;font-size:11pt\">★녹음과정은 카카오TV로 생중계됩니다★</span></span></b></p><p><b><span style=\"font-size:10pt\"><span style=\"font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial;font-size:11pt\">☆변동될 경우, 본 알림창을 통해 알려 드리겠습니다☆ </span></span></b></p><p><b style=\"font-size:14.6667px;font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial\">5/3 (월)</b><b style=\"font-size:14.6667px;font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial\"> </b><b style=\"font-size:14.6667px;font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial\">20:30 </b><b style=\"font-size:14.6667px;font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial\">꼰묘꼰묘해 with. 러블리즈 지애</b></p><p><b style=\"font-size:14.6667px;font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial\">5/4 (화) </b><b style=\"font-size:14.6667px;font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial\">18:00 </b><b style=\"font-size:14.6667px;font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial\">비연애참피언스리그 어린이날 특집 with. 박문성 해설위원, 홍잠언</b><b style=\"font-size:14.6667px;font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial\">      </b></p><p><b style=\"font-size:14.6667px;font-family:&quot;Malgun Gothic&quot;, 굴림, Gulim, Arial\">5/6 (목) 19:30 말년이 편한 가불판단소 with. 이말년</b></p><p><b style=\"font-size:13.33px\"><span style=\"font-size:11pt\"></span></b></p><p><b style=\"font-size:10pt\"><span style=\"font-size:11pt\"><span style=\"font-size:10pt\"><b><span style=\"font-size:11pt\"><span style=\"font-size:10pt\"><b><span style=\"font-size:11pt\"></span></b></span></span></b></span></span></b></p>")
});