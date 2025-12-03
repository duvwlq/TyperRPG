/* ============================================
   sentences.js - 타이핑 게임 문장 데이터 (리팩토링)
   ============================================ */

// ========== 문장 풀 (200개) ==========
// 카테고리: proverb(속담), quote(명언), everyday(일상), coding(코딩), literature(문학)

export const sentencePool = [
  // === 속담 (40개) ===
  { id: 1, text: '티끌 모아 태산', category: 'proverb', length: 'short' },
  { id: 2, text: '천 리 길도 한 걸음부터', category: 'proverb', length: 'short' },
  { id: 3, text: '백문이 불여일견', category: 'proverb', length: 'short' },
  { id: 4, text: '급할수록 돌아가라', category: 'proverb', length: 'short' },
  { id: 5, text: '소 잃고 외양간 고친다', category: 'proverb', length: 'short' },
  { id: 6, text: '구슬이 서 말이라도 꿰어야 보배', category: 'proverb', length: 'medium' },
  { id: 7, text: '원숭이도 나무에서 떨어진다', category: 'proverb', length: 'medium' },
  { id: 8, text: '호랑이에게 물려가도 정신만 차리면 산다', category: 'proverb', length: 'medium' },
  { id: 9, text: '낮말은 새가 듣고 밤말은 쥐가 듣는다', category: 'proverb', length: 'medium' },
  { id: 10, text: '가는 말이 고와야 오는 말이 곱다', category: 'proverb', length: 'medium' },
  { id: 11, text: '하늘이 무너져도 솟아날 구멍이 있다', category: 'proverb', length: 'medium' },
  { id: 12, text: '세 살 버릇 여든까지 간다', category: 'proverb', length: 'medium' },
  { id: 13, text: '돌다리도 두들겨 보고 건너라', category: 'proverb', length: 'medium' },
  { id: 14, text: '울며 겨자 먹기', category: 'proverb', length: 'short' },
  { id: 15, text: '금강산도 식후경', category: 'proverb', length: 'short' },
  { id: 16, text: '백지장도 맞들면 낫다', category: 'proverb', length: 'short' },
  { id: 17, text: '바늘 도둑이 소 도둑 된다', category: 'proverb', length: 'medium' },
  { id: 18, text: '모르는 게 약이다', category: 'proverb', length: 'short' },
  { id: 19, text: '누워서 침 뱉기', category: 'proverb', length: 'short' },
  { id: 20, text: '고생 끝에 낙이 온다', category: 'proverb', length: 'short' },
  { id: 21, text: '등잔 밑이 어둡다', category: 'proverb', length: 'short' },
  { id: 22, text: '말이 씨가 된다', category: 'proverb', length: 'short' },
  { id: 23, text: '뜻이 있는 곳에 길이 있다', category: 'proverb', length: 'medium' },
  { id: 24, text: '친구 따라 강남 간다', category: 'proverb', length: 'short' },
  { id: 25, text: '빈 수레가 요란하다', category: 'proverb', length: 'short' },
  { id: 26, text: '쇠뿔도 단김에 빼라', category: 'proverb', length: 'short' },
  { id: 27, text: '호박이 넝쿨째 굴러들어온다', category: 'proverb', length: 'medium' },
  { id: 28, text: '개천에서 용 난다', category: 'proverb', length: 'short' },
  { id: 29, text: '서당개 삼 년이면 풍월을 읊는다', category: 'proverb', length: 'medium' },
  { id: 30, text: '입이 열 개라도 할 말이 없다', category: 'proverb', length: 'medium' },
  { id: 31, text: '공든 탑이 무너지랴', category: 'proverb', length: 'short' },
  { id: 32, text: '윗물이 맑아야 아랫물이 맑다', category: 'proverb', length: 'medium' },
  { id: 33, text: '꿩 먹고 알 먹는다', category: 'proverb', length: 'short' },
  { id: 34, text: '금이야 옥이야', category: 'proverb', length: 'short' },
  { id: 35, text: '눈 가리고 아웅', category: 'proverb', length: 'short' },
  { id: 36, text: '발 없는 말이 천 리 간다', category: 'proverb', length: 'medium' },
  { id: 37, text: '비 온 뒤에 땅이 굳는다', category: 'proverb', length: 'medium' },
  { id: 38, text: '사공이 많으면 배가 산으로 간다', category: 'proverb', length: 'medium' },
  { id: 39, text: '우물 안 개구리', category: 'proverb', length: 'short' },
  { id: 40, text: '작은 고추가 더 맵다', category: 'proverb', length: 'short' },

  // === 명언 (40개) ===
  { id: 41, text: '오늘 할 수 있는 일을 내일로 미루지 마라', category: 'quote', length: 'medium' },
  { id: 42, text: '할 수 있다고 믿으면 이미 절반은 성공한 것이다', category: 'quote', length: 'medium' },
  { id: 43, text: '시작이 반이다', category: 'quote', length: 'short' },
  { id: 44, text: '실패는 성공의 어머니', category: 'quote', length: 'short' },
  { id: 45, text: '노력은 배신하지 않는다', category: 'quote', length: 'short' },
  { id: 46, text: '기회는 준비된 자에게만 온다', category: 'quote', length: 'medium' },
  { id: 47, text: '지금 이 순간이 가장 중요하다', category: 'quote', length: 'medium' },
  { id: 48, text: '꿈을 꾸는 자는 현실을 만든다', category: 'quote', length: 'medium' },
  { id: 49, text: '포기하지 않는 한 실패는 없다', category: 'quote', length: 'medium' },
  { id: 50, text: '행동이 말보다 중요하다', category: 'quote', length: 'short' },
  { id: 51, text: '변화를 두려워하지 마라', category: 'quote', length: 'short' },
  { id: 52, text: '최선을 다하면 후회는 없다', category: 'quote', length: 'medium' },
  { id: 53, text: '용기는 두려움이 없는 것이 아니다', category: 'quote', length: 'medium' },
  { id: 54, text: '작은 것에 감사하라', category: 'quote', length: 'short' },
  { id: 55, text: '인내는 쓰지만 그 열매는 달다', category: 'quote', length: 'medium' },
  { id: 56, text: '길은 가는 자가 만든다', category: 'quote', length: 'short' },
  { id: 57, text: '오늘이 인생의 첫날이라고 생각하라', category: 'quote', length: 'medium' },
  { id: 58, text: '긍정적인 마음이 성공을 부른다', category: 'quote', length: 'medium' },
  { id: 59, text: '배움에는 끝이 없다', category: 'quote', length: 'short' },
  { id: 60, text: '세상을 바꾸고 싶다면 먼저 자신을 바꿔라', category: 'quote', length: 'medium' },
  { id: 61, text: '시간은 금이다', category: 'quote', length: 'short' },
  { id: 62, text: '생각이 바뀌면 행동이 바뀐다', category: 'quote', length: 'medium' },
  { id: 63, text: '꿈꾸는 것을 멈추지 마라', category: 'quote', length: 'short' },
  { id: 64, text: '진정한 용기는 어려움을 극복하는 힘', category: 'quote', length: 'medium' },
  { id: 65, text: '어제보다 나은 오늘을 만들어라', category: 'quote', length: 'medium' },
  { id: 66, text: '불가능은 없다', category: 'quote', length: 'short' },
  { id: 67, text: '도전하지 않으면 얻는 것도 없다', category: 'quote', length: 'medium' },
  { id: 68, text: '지혜는 경험에서 나온다', category: 'quote', length: 'short' },
  { id: 69, text: '자신감은 성공의 첫 번째 비결', category: 'quote', length: 'medium' },
  { id: 70, text: '희망을 가지고 앞으로 나아가라', category: 'quote', length: 'medium' },
  { id: 71, text: '열정은 모든 것을 가능하게 한다', category: 'quote', length: 'medium' },
  { id: 72, text: '겸손은 최고의 미덕이다', category: 'quote', length: 'short' },
  { id: 73, text: '진실은 언제나 승리한다', category: 'quote', length: 'short' },
  { id: 74, text: '작은 변화가 큰 결과를 만든다', category: 'quote', length: 'medium' },
  { id: 75, text: '인생은 선택의 연속이다', category: 'quote', length: 'short' },
  { id: 76, text: '미소는 세상을 밝게 한다', category: 'quote', length: 'short' },
  { id: 77, text: '친절은 가장 아름다운 언어', category: 'quote', length: 'medium' },
  { id: 78, text: '지금 이 순간을 즐겨라', category: 'quote', length: 'short' },
  { id: 79, text: '정직은 최선의 정책이다', category: 'quote', length: 'short' },
  { id: 80, text: '감사하는 마음이 행복을 부른다', category: 'quote', length: 'medium' },

  // === 일상 문장 (40개) ===
  { id: 81, text: '오늘 날씨가 참 좋네요', category: 'everyday', length: 'short' },
  { id: 82, text: '점심은 무엇을 먹을까요', category: 'everyday', length: 'short' },
  { id: 83, text: '주말에 영화 보러 갈까요', category: 'everyday', length: 'medium' },
  { id: 84, text: '운동을 시작해야겠어요', category: 'everyday', length: 'short' },
  { id: 85, text: '책을 읽는 시간이 즐겁습니다', category: 'everyday', length: 'medium' },
  { id: 86, text: '커피 한 잔 하시겠어요', category: 'everyday', length: 'short' },
  { id: 87, text: '오늘은 일찍 퇴근하고 싶어요', category: 'everyday', length: 'medium' },
  { id: 88, text: '건강이 최고입니다', category: 'everyday', length: 'short' },
  { id: 89, text: '가족과 함께하는 시간이 소중합니다', category: 'everyday', length: 'medium' },
  { id: 90, text: '여행을 떠나고 싶어요', category: 'everyday', length: 'short' },
  { id: 91, text: '취미 생활을 가져보세요', category: 'everyday', length: 'short' },
  { id: 92, text: '음악을 들으면 기분이 좋아져요', category: 'everyday', length: 'medium' },
  { id: 93, text: '친구를 만나러 갑니다', category: 'everyday', length: 'short' },
  { id: 94, text: '새로운 것을 배우는 건 재미있어요', category: 'everyday', length: 'medium' },
  { id: 95, text: '아침 일찍 일어나기', category: 'everyday', length: 'short' },
  { id: 96, text: '산책하기 좋은 날씨입니다', category: 'everyday', length: 'medium' },
  { id: 97, text: '맛있는 음식 먹고 싶어요', category: 'everyday', length: 'short' },
  { id: 98, text: '충분한 휴식이 필요합니다', category: 'everyday', length: 'medium' },
  { id: 99, text: '감사 인사를 전합니다', category: 'everyday', length: 'short' },
  { id: 100, text: '새해 복 많이 받으세요', category: 'everyday', length: 'short' },
  { id: 101, text: '생일 축하합니다', category: 'everyday', length: 'short' },
  { id: 102, text: '수고하셨습니다', category: 'everyday', length: 'short' },
  { id: 103, text: '잘 부탁드립니다', category: 'everyday', length: 'short' },
  { id: 104, text: '도움을 주셔서 감사합니다', category: 'everyday', length: 'medium' },
  { id: 105, text: '다음에 또 만나요', category: 'everyday', length: 'short' },
  { id: 106, text: '즐거운 하루 보내세요', category: 'everyday', length: 'short' },
  { id: 107, text: '건강 조심하세요', category: 'everyday', length: 'short' },
  { id: 108, text: '좋은 결과 있기를 바랍니다', category: 'everyday', length: 'medium' },
  { id: 109, text: '화이팅 하세요', category: 'everyday', length: 'short' },
  { id: 110, text: '오랜만에 만나서 반가워요', category: 'everyday', length: 'medium' },
  { id: 111, text: '시간 가는 줄 몰랐네요', category: 'everyday', length: 'short' },
  { id: 112, text: '내일 일정이 어떻게 되나요', category: 'everyday', length: 'medium' },
  { id: 113, text: '연락 주셔서 감사합니다', category: 'everyday', length: 'medium' },
  { id: 114, text: '조금만 기다려 주세요', category: 'everyday', length: 'short' },
  { id: 115, text: '제가 도와드릴게요', category: 'everyday', length: 'short' },
  { id: 116, text: '괜찮으시면 같이 가요', category: 'everyday', length: 'short' },
  { id: 117, text: '약속 시간을 확인해 주세요', category: 'everyday', length: 'medium' },
  { id: 118, text: '전화 드리겠습니다', category: 'everyday', length: 'short' },
  { id: 119, text: '메시지 남겨주세요', category: 'everyday', length: 'short' },
  { id: 120, text: '다시 한번 설명해 주시겠어요', category: 'everyday', length: 'medium' },

  // === 코딩 관련 (40개) ===
  { id: 121, text: 'console.log("Hello World");', category: 'coding', length: 'medium' },
  { id: 122, text: 'function test() { return true; }', category: 'coding', length: 'medium' },
  { id: 123, text: 'const name = "TyperRPG";', category: 'coding', length: 'medium' },
  { id: 124, text: 'let count = 0;', category: 'coding', length: 'short' },
  { id: 125, text: 'if (score > 100) { win(); }', category: 'coding', length: 'medium' },
  { id: 126, text: 'for (let i = 0; i < 10; i++) { }', category: 'coding', length: 'medium' },
  { id: 127, text: 'while (true) { break; }', category: 'coding', length: 'medium' },
  { id: 128, text: 'array.map(x => x * 2)', category: 'coding', length: 'medium' },
  { id: 129, text: 'import React from "react";', category: 'coding', length: 'medium' },
  { id: 130, text: 'export default App;', category: 'coding', length: 'short' },
  { id: 131, text: 'async function getData() { }', category: 'coding', length: 'medium' },
  { id: 132, text: 'await fetch(url);', category: 'coding', length: 'short' },
  { id: 133, text: 'try { code(); } catch (e) { }', category: 'coding', length: 'medium' },
  { id: 134, text: 'class Player { }', category: 'coding', length: 'short' },
  { id: 135, text: 'const obj = { hp: 100 };', category: 'coding', length: 'medium' },
  { id: 136, text: 'arr.filter(x => x > 0)', category: 'coding', length: 'medium' },
  { id: 137, text: 'return value;', category: 'coding', length: 'short' },
  { id: 138, text: 'switch (type) { case "A": }', category: 'coding', length: 'medium' },
  { id: 139, text: 'npm install package', category: 'coding', length: 'short' },
  { id: 140, text: 'git commit -m "message"', category: 'coding', length: 'medium' },
  { id: 141, text: 'useState(0);', category: 'coding', length: 'short' },
  { id: 142, text: 'useEffect(() => { }, []);', category: 'coding', length: 'medium' },
  { id: 143, text: 'props.children', category: 'coding', length: 'short' },
  { id: 144, text: 'document.querySelector("#id")', category: 'coding', length: 'medium' },
  { id: 145, text: 'JSON.parse(data)', category: 'coding', length: 'short' },
  { id: 146, text: 'localStorage.setItem(key, val)', category: 'coding', length: 'medium' },
  { id: 147, text: 'Math.random()', category: 'coding', length: 'short' },
  { id: 148, text: 'parseInt("123")', category: 'coding', length: 'short' },
  { id: 149, text: 'arr.push(item);', category: 'coding', length: 'short' },
  { id: 150, text: 'obj.hasOwnProperty("key")', category: 'coding', length: 'medium' },
  { id: 151, text: 'typeof variable', category: 'coding', length: 'short' },
  { id: 152, text: 'new Date()', category: 'coding', length: 'short' },
  { id: 153, text: 'setTimeout(() => { }, 1000)', category: 'coding', length: 'medium' },
  { id: 154, text: 'Promise.resolve()', category: 'coding', length: 'short' },
  { id: 155, text: 'throw new Error("message")', category: 'coding', length: 'medium' },
  { id: 156, text: 'null !== undefined', category: 'coding', length: 'short' },
  { id: 157, text: 'str.split(",").join("-")', category: 'coding', length: 'medium' },
  { id: 158, text: 'Number.isNaN(value)', category: 'coding', length: 'short' },
  { id: 159, text: 'Object.keys(obj)', category: 'coding', length: 'short' },
  { id: 160, text: 'Array.from({length: 10})', category: 'coding', length: 'medium' },

  // === 문학/기타 (40개) ===
  { id: 161, text: '살아있는 모든 것들에게 경의를', category: 'literature', length: 'medium' },
  { id: 162, text: '인생은 가까이서 보면 비극이지만 멀리서 보면 희극', category: 'literature', length: 'medium' },
  { id: 163, text: '길은 멀고 험하다', category: 'literature', length: 'short' },
  { id: 164, text: '꽃은 말이 없다', category: 'literature', length: 'short' },
  { id: 165, text: '바람이 불어오는 곳', category: 'literature', length: 'short' },
  { id: 166, text: '별을 헤는 밤', category: 'literature', length: 'short' },
  { id: 167, text: '산에는 꽃이 피네', category: 'literature', length: 'short' },
  { id: 168, text: '하늘을 우러러 한 점 부끄럼이 없기를', category: 'literature', length: 'medium' },
  { id: 169, text: '나의 살던 고향은 꽃 피는 산골', category: 'literature', length: 'medium' },
  { id: 170, text: '청산은 내 뜻이요 녹수는 님의 정', category: 'literature', length: 'medium' },
  { id: 171, text: '봄이 오면 산에 들에', category: 'literature', length: 'short' },
  { id: 172, text: '강물은 흐르는데', category: 'literature', length: 'short' },
  { id: 173, text: '그대 있는 곳이 꽃밭', category: 'literature', length: 'short' },
  { id: 174, text: '지금은 이별이지만', category: 'literature', length: 'short' },
  { id: 175, text: '행복은 성적순이 아니잖아요', category: 'literature', length: 'medium' },
  { id: 176, text: '사랑하는 것은 사랑을 받는 것보다 행복하다', category: 'literature', length: 'medium' },
  { id: 177, text: '진실한 사랑은 영원하다', category: 'literature', length: 'short' },
  { id: 178, text: '희망은 깨어있는 자들의 꿈', category: 'literature', length: 'medium' },
  { id: 179, text: '아름다운 것들은 사라지지 않는다', category: 'literature', length: 'medium' },
  { id: 180, text: '모든 순간이 선물이다', category: 'literature', length: 'short' },
  { id: 181, text: '세상의 모든 아침', category: 'literature', length: 'short' },
  { id: 182, text: '그리움은 가슴에 남아', category: 'literature', length: 'short' },
  { id: 183, text: '시간이 흘러도 변하지 않는 것', category: 'literature', length: 'medium' },
  { id: 184, text: '우리는 모두 별에서 왔다', category: 'literature', length: 'medium' },
  { id: 185, text: '어둠 속에서도 빛은 있다', category: 'literature', length: 'medium' },
  { id: 186, text: '마음의 평화를 찾아서', category: 'literature', length: 'short' },
  { id: 187, text: '영혼의 소리를 들어라', category: 'literature', length: 'short' },
  { id: 188, text: '자연은 위대한 스승이다', category: 'literature', length: 'short' },
  { id: 189, text: '침묵은 때로 최선의 대답', category: 'literature', length: 'medium' },
  { id: 190, text: '진정한 아름다움은 내면에 있다', category: 'literature', length: 'medium' },
  { id: 191, text: '눈물은 영혼의 언어', category: 'literature', length: 'short' },
  { id: 192, text: '웃음은 마음의 약', category: 'literature', length: 'short' },
  { id: 193, text: '상처는 치유의 시작', category: 'literature', length: 'short' },
  { id: 194, text: '기억은 영원히 남는다', category: 'literature', length: 'short' },
  { id: 195, text: '삶은 여행이다', category: 'literature', length: 'short' },
  { id: 196, text: '운명은 스스로 만드는 것', category: 'literature', length: 'medium' },
  { id: 197, text: '용서는 자유로 가는 길', category: 'literature', length: 'medium' },
  { id: 198, text: '지혜는 나이와 함께 온다', category: 'literature', length: 'medium' },
  { id: 199, text: '마음의 문을 열어라', category: 'literature', length: 'short' },
  { id: 200, text: '모든 끝은 새로운 시작', category: 'literature', length: 'medium' }
]

// ========== 몬스터 정의 (5개) ==========
// WPM 기반 데미지 시스템에 맞춰 HP 조정
// 목표: 플레이어가 3-5문장 정도를 완료해야 몬스터 처치 가능
export const monsters = [
  {
    id: 1,
    name: '고블린',
    hp: 200,         // 초급자 (WPM 30) 기준 3-4문장
    exp: 30,
    gold: 50
  },
  {
    id: 2,
    name: '늑대',
    hp: 400,         // 중급자 (WPM 50) 기준 3-4문장
    exp: 50,
    gold: 80
  },
  {
    id: 3,
    name: '트롤',
    hp: 600,         // 상급자 (WPM 70) 기준 3-4문장
    exp: 80,
    gold: 120
  },
  {
    id: 4,
    name: '드래곤',
    hp: 1000,        // 고급자 (WPM 100) 기준 4-5문장
    exp: 150,
    gold: 200
  },
  {
    id: 5,
    name: '버그',
    hp: 350,         // 중급자 (WPM 60) 기준 3-4문장
    exp: 60,
    gold: 100
  }
]

// ========== 스테이지 정의 (5개) ==========
export const stages = [
  {
    id: 1,
    title: '고블린 숲',
    difficulty: 'easy',
    description: '고블린이 사는 숲입니다. 초보자에게 적합합니다.',
    recommendedWPM: 30,
    monsterId: 1
  },
  {
    id: 2,
    title: '안개 초원',
    difficulty: 'normal',
    description: '안개가 자욱한 초원입니다. 오타에 주의하세요.',
    recommendedWPM: 50,
    monsterId: 2
  },
  {
    id: 3,
    title: '어두운 동굴',
    difficulty: 'hard',
    description: '어둠 속의 위험한 동굴입니다. 고급자에게 추천합니다.',
    recommendedWPM: 70,
    monsterId: 3
  },
  {
    id: 4,
    title: '화산 지대',
    difficulty: 'very-hard',
    description: '뜨거운 용암이 흐르는 화산입니다. 최고 난이도입니다.',
    recommendedWPM: 100,
    monsterId: 4
  },
  {
    id: 5,
    title: '코딩의 숲',
    difficulty: 'normal',
    description: '프로그래밍 용어로 가득한 숲입니다.',
    recommendedWPM: 60,
    monsterId: 5
  }
]

// ========== 유틸리티 함수 ==========

// 문장 캐시 (스테이지 ID별로 한 번 생성된 문장을 저장)
const sentenceCache = new Map()

/**
 * 랜덤하게 N개의 문장을 선택합니다
 * @param {number} count - 선택할 문장 개수
 * @returns {Array} 랜덤하게 선택된 문장 배열
 */
export function getRandomSentences(count = 5) {
  const shuffled = [...sentencePool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map(s => s.text)
}

/**
 * 특정 카테고리에서 랜덤하게 N개의 문장을 선택합니다
 * @param {string} category - 카테고리 이름
 * @param {number} count - 선택할 문장 개수
 * @returns {Array} 랜덤하게 선택된 문장 배열
 */
export function getRandomSentencesByCategory(category, count = 5) {
  const filtered = sentencePool.filter(s => s.category === category)
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map(s => s.text)
}

/**
 * 특정 길이의 문장을 랜덤하게 N개 선택합니다
 * @param {string} length - 'short' 또는 'medium'
 * @param {number} count - 선택할 문장 개수
 * @returns {Array} 랜덤하게 선택된 문장 배열
 */
export function getRandomSentencesByLength(length, count = 5) {
  const filtered = sentencePool.filter(s => s.length === length)
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map(s => s.text)
}

/**
 * 특정 ID의 스테이지 정보를 가져옵니다 (몬스터 정보 포함)
 * @param {number} id - 스테이지 ID
 * @returns {Object} 스테이지 정보와 몬스터 정보를 포함한 객체
 */
export function getContentById(id) {
  const stage = stages.find(s => s.id === parseInt(id))
  if (!stage) return null

  const monster = monsters.find(m => m.id === stage.monsterId)

  // 캐시에서 문장을 가져오거나, 없으면 새로 생성하고 캐시에 저장
  if (!sentenceCache.has(id)) {
    sentenceCache.set(id, getRandomSentences(5))
  }

  // 기존 구조와 호환되도록 반환
  return {
    id: stage.id,
    title: stage.title,
    difficulty: stage.difficulty,
    description: stage.description,
    recommendedWPM: stage.recommendedWPM,
    sentences: sentenceCache.get(id),  // 캐시된 문장 사용 (고정됨)
    monster: {
      name: monster.name,
      hp: monster.hp,
      exp: monster.exp,
      gold: monster.gold
    }
  }
}

/**
 * 모든 스테이지 목록을 가져옵니다
 * @returns {Array} 스테이지 목록
 */
export function getAllContents() {
  return stages.map(stage => {
    const monster = monsters.find(m => m.id === stage.monsterId)
    return {
      id: stage.id,
      title: stage.title,
      difficulty: stage.difficulty,
      description: stage.description,
      recommendedWPM: stage.recommendedWPM,
      monster: {
        name: monster.name,
        hp: monster.hp,
        exp: monster.exp,
        gold: monster.gold
      }
    }
  })
}

/**
 * 카테고리별 문장 수를 반환합니다
 * @returns {Object} 카테고리별 문장 개수
 */
export function getSentenceStats() {
  const stats = {}
  sentencePool.forEach(s => {
    stats[s.category] = (stats[s.category] || 0) + 1
  })
  return stats
}
