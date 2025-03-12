import { type DetailCard } from '@/components/travel/travelDetail/TravelInfoCard.vue';
import { type PetTravelDetail } from '@/components/travel/travelDetail/withPetsInfo.vue';
import { type RoomItem } from '@/components/travel/travelDetail/AccommodationCard.vue';
import { type DetailInfoData } from '@/components/travel/travelDetail/DetailInfoComponent.vue';

const DummyAccData: DetailCard = {
  contenttypeid: '32',
  title: '가람초연재',
  addr1: '경상북도 안동시 풍천면 하회종가길 76-6',
  tel: '010-2342-1256',
  firstimage: 'http://tong.visitkorea.or.kr/cms/resource/48/2993048_image2_1.jpg',
  overview:
    '가람초연재는 낙동강 상류가 굽이굽이 흐르는 고즈넉한 하회마을에 자리한다. 기와지붕 고택 사이에서 볏짚을 두툼하게 올려 말끔히 손질한 초가지붕의 가람초연재가 눈에 띈다. ‘가람’은 서애 류성룡의 15대손인 주인 할아버지의 호이고 ‘초연재’는 제비가 사는 초가집이란 의미로, 실제 서까래나 처마 밑에 사는 제비를 볼 수 있다. 사랑채 마루에서 안채 뒤쪽으로 넘어가는 해는 몽환적인 시간을 선사한다. 갓 만들기 및 디딜방아, 맷돌 같은 민속도구 체험을 할 수 있다.',
  homepage: '초연재.한국',
  mapx: 0,
  mapy: 0,
  roomcount: 3,
  checkintime: '15:00',
  checkouttime: '10:00',
  refundregulation: '이용일 7일전 90%, 5일전 70%, 3일전 50%, 1일전 또는 당일 20%',
};
const DummyRestaurantData: DetailCard = {
  contenttypeid: '39',
  title: '가평카페109',
  addr1: '경기도 가평군 상면 축령로 109',
  tel: '010-2342-1256',
  firstimage: 'http://tong.visitkorea.or.kr/cms/resource/43/3083743_image2_1.JPG',
  overview:
    '야자수를 비롯한 다양한 식물들이 많은 플라워 카페이다. 꽃과 나무들이 자연스럽게 배치되어 있어 마치 숲속을 산책하는 듯한 분위기의 카페이며 사진 스폿이 많은 곳이다. 매장 안 입구에는 한옥 분위기의 매대가 있어 커피류를 비롯해서 다양한 종류의 음료와 간단한 디저트를 주문하면 된다. 건물 1, 2층으로 이루어져 있다.1층 식물원에도 좌석이 있고 분수대 위쪽 2층에는 가운데에 정원이 예쁘게 꾸며져 있고 그 가장자리에는 마루와 테이블이 놓인 좌석도 있다. 그 외에도 단체 손님을 위한 테이블이나 데이트하기 좋은 창가 쪽 테이블도 있다. 천창을 통해 들어오는 햇살 속에서 부지런히 자라는 여러 식물들과 시원한 분수대 물소리를 들으며 차분히 쉴 수 있는 곳이다.',
  homepage: '네이버에 검색하세요',
  mapx: 0,
  mapy: 0,
  restdatefood: '연중무휴',
  parkingfood: '가능(무료, 전용 주차장 만차 시 언덕 위 주차 가능)',
  firstmenu: '와플 슈페너',
  treatmenu: '커피 / 음료 / 디저트',
};

const DummyCultureData: DetailCard = {
  contenttypeid: '14',
  title: '가평현암 농경박물관',
  addr1: '경기도 가평군 북면 석장모루길 13',
  tel: null,
  firstimage: 'http://tong.visitkorea.or.kr/cms/resource/50/1090950_image2_1.jpg',
  homepage: '가평군 문화관광 - 관광명소 - 관광지 - 문화관광지',
  mapx: 0,
  mapy: 0,
  overview:
    '경기도 가평군 북면에 위치한 가평현암 농경박물관은 가속화되는 도시화와 산업화로 인해 사라져가는 농업 문화유산을 보존하기 위해 설립되었다. 가평교육청에서 가평 북중학교, 가평 목동초등학교 교내에 박물관을 설립하여 누구나 쉽게 방문하여 조상들의 지혜와 얼을 배우고 전통문화에 관심을 가질 수 있도록 마련된 곳이다. 농경유물 위주로 2,000여 점이 전시되고 있으며 농기구를 체험할 수도 있다.이곳은 5개의 전시관으로 나뉘어 있으며 정해진 시간에 해설사 선생님의 설명을 들을 수 있다. 연출관은 조상들의 일상생활을 엿볼 수 있는 농촌 가옥을 재현한 곳으로 민속자료가 전시되어 있고, 농경사회에 주 가사 도구가 되었던 소품이 전시된 민속관, 지역에 따라 농기구 형태가 어떻게 다른지를 보여주는 밭갈이관, 수확의 기쁨을 누릴 수 있는 추수 연장이 전시된 추수관, 곡식을 가공할 수 있는 민속품이 전시된 가공관으로 나누어져 있다. 책에서만 보던 농경 유물들을 직접 볼 수 있어 아이들의 학습에도 도움이 될 것이다.',
  infocenterculture: '가평 북중학교 행정실 031-581-0612',
  usetimeculture: '10:00~15:00 (입장 마감 14:30)',
  parkingculture: '가능 (50대)',
  parkingfee: '무료',
  restdateculture: '주말 / 공휴일 / 명절 / 학교 재량 휴업일',
};

const DummyShoppingData: DetailCard = {
  contenttypeid: '38',
  title: '가평 현리5일장 (4, 9일)',
  addr1: '경기도 가평군 조종면 현창로44번길 14',
  tel: '031-585-1014',
  homepage: null,
  firstimage: 'http://tong.visitkorea.or.kr/cms/resource/62/1787162_image2_1.jpg',
  fairday: '매월 4, 9, 14, 19, 24, 29일',
  mapx: 0,
  mapy: 0,
  infocentershopping: '031-585-1014',
  overview:
    '현리 5일장은 매달 4일과 9일에 장이 서는 전통 5일장이다. 하면장이라고 불리던 현리 5일장은 1966년 개장하여 현재까지 이어오고 있으며 타 지역 사람들보다 현지 주민들이 이용하는 소규모 시장이다. 장터 부지가 협소하여 대부분 조총 초등학교 근처에 위치한 중앙상가 골목과 도로변에서 노점과 좌판 판매가 이루어지고 있다. 이곳에서는 주로 생식품, 가공식품, 의류, 가정·문화용품, 잡화 등이 판매되고 있으며 시골장터의 정겨움을 느낄 수 있다.\n\n현리 장날에는 뻥튀기 소리와 함께 고소한 참기름 냄새가 사방을 뒤덮고 왁자지껄 흥정하고 안부를 묻는 소리로 시끄러워진다. 시골장터답게 농기구를 판매하고 손질해 주는 곳도 있고 직접 재배한 채소와 과일은 물론 맛있는 도넛과 꽈배기를 판매하는 곳도 있다. 모자와 바지, 티셔츠, 원피스, 속옷 등으로도 자연스럽게 눈이 가는 곳이다. 집에서 만든 여러 종류의 장아찌와 반찬, 모종과 꽃 화분 등도 찾아볼 수 있다. 지치고 힘들어 재미없는 시간의 연속이라면 활기찬 5일장을 찾아가 보면 좋을 것이다.',
  parkingshopping: '가능 (주차장 협소)',
  restdateshopping: null,
};

const DummyTourSpotData: DetailCard = {
  contenttypeid: '12',
  title: '가우도',
  addr1: '전라남도 강진군 도암면 월곶로 473',
  tel: null,
  homepage: null,
  firstimage: null,
  overview:
    '강진군 도암면 망호(望湖)에 속한 강진만의 8개 섬 가운데 유일한 유인도인 가우도는 강진읍 보은산이 소의 머리에 해당되고 섬의 생김새가 소(牛)의 멍에에 해당된다 하여 ‘가우도’라고 부르게 되었다고 전해진다. 가우도는 사방으로 강진만과 무인도를 조망할 수 있으며 해안경관이 매우 우수하고 섬 내부에는 후박나무, 편백나무 군락지 및 곰솔 등 천혜의 관광 자원이 매우 풍부하다. 자동차가 다니지 않는 출렁다리가 양쪽으로 연결되어 걸어서 섬에 들어갈 수 있으며 섬에 도착하면 산과 바다를 감상하여 걸을 수 있는 2.5km의 생태탐방로가 조성되어 있으며, 다양한 어종이 잡히는 복합낚시공원, 섬 정상에 있는 청자타워(높이 25m)에서 출발하여 해상을 나는 체험을 할 수 있는 친환경 레저시설인 집트렉, 바다를 가르는 제트보트 등 다양한 레저 체험을 즐길 수 있다.',
  mapx: 0,
  mapy: 0,
  infocenter: '010-3849-7542',
  restdate: '연중무휴',
  parking: '불가능',
  usetime: null,
  expguide:
    '[짚트랙체험]<br />\n- 개인 25,000원<br />\n- 단체 성인 18,000원 (20인 이상) / 단체 학생 15,000원(20인 이상)<br />\n- 학생 17,000원 (고등학생 이하)<br />\n- 강진군민 15,000원 (장애인, 군인, 경찰 포함)<br />\n※ 이용요금은 변동될 수 있으므로 홈페이지 참조 또는 전화 문의 요망',
};

const DummyActivitiesData: DetailCard = {
  contenttypeid: '28',
  title: '가평TOP랜드 번지점프',
  addr1: '경기도 가평군 가평읍 북한강변로 1044-15',
  homepage: 'http://www.ktopland.com',
  tel: null,
  mapx: 0,
  mapy: 0,
  overview:
    '가평TOP랜드(가평탑랜드)는 1999년에 시작한 복합 익스트림 수상레저타운이다. 국내 최대 규모라고 할 만큼 번지점프와 수상 레저, 단체 수용 가능한 펜션과 라이브 카페, 북한강 선상 바비큐 시설을 겸비하고 있으며 여러 방송에 알려진 유명한 번지점프 장소이기도 하다.지점프는 예매를 해야 하고 예매 후 10일 이내 사용을 권장한다. 기상악화 시 이용이 중단될 수 있고 취소 시 위약금이 발생할 수 있다.번지점프는 안전한 번지점프를 위하여 주의사항이 적힌 서약서를 작성하고 서약서에 적힌 안전 규칙들을 숙지하여 안전한 번지점프를 즐길 수 있도록 주의해야 한다. 자신에게 맞는 장비 착용을 위한 필수 과정으로 몸무게를 측정하고 35kg~103kg까지 이용 가능하며, 교관의 지시에 따라 안전 장비를 착용하고 교관을 통해 번지점프 안전교육 및 실습을 받아야 한다.교관과 함께 번지점프를 하기 위한 [상판]으로 엘리베이터를 타고 이동하고 교관의 구령 및 지시에 따라 번지점프를 체험해 볼 수 있다.',
  firstimage: 'http://tong.visitkorea.or.kr/cms/resource/86/1900086_image2_1.jpg',
  infocenterleports: '031-582-5372',
  parkingleports: '가능<br>요금(무료)',
  restdateleports: '연중무휴, 단 사전예약',
  usefeeleports: null,
  usetimeleports: '09:00~18:00',
};

const DummyWithPetsInfo: PetTravelDetail = {
  contentId: '1720749',
  acmpyNeedMtr: '일부구역 동반가능',
  acmpyTypeCd: '일부구역 동반가능',
  acmpyPsblCpam: '전 견종 동반 가능',
  etcAcmpyInfo:
    '- 맹견의 경우, 입마개 착용 필수\n- 배변봉투 지참 및 배변처리 필수\n- 맨발 체험이 가능한 황톳길은 동반 불가\n- 황톳길 옆 보행 도로는 동반 가능',
};


const roomsData: RoomItem[] = [
  {
    contentid: '1865597',
    contenttypeid: '32',
    roomtitle: '별채B',
    roomsize1: '5',
    roomcount: '0',
    roomintro:
      '※ 위 정보는 2024년 10월에 작성된 정보로(정상요금), 해당 숙박시설 이용요금이 수시로 변동됨에 따라 이용요금 및 기타 자세한 사항은 홈페이지 참조 요망',
    roomimg1: 'http://tong.visitkorea.or.kr/cms/resource/34/2579434_image2_1.jpg',
    roomoffseasonminfee1: '100000',
    accomcountlodging: '17',
  },
  {
    contentid: '1865597',
    contenttypeid: '32',
    roomtitle: '별채B',
    roomsize1: '5',
    roomcount: '0',
    roomintro:
      '※ 위 정보는 2024년 10월에 작성된 정보로(정상요금), 해당 숙박시설 이용요금이 수시로 변동됨에 따라 이용요금 및 기타 자세한 사항은 홈페이지 참조 요망',
    roomimg1: 'http://tong.visitkorea.or.kr/cms/resource/34/2579434_image2_1.jpg',
    roomoffseasonminfee1: '100000',
    accomcountlodging: '17',
  },
];
const rawDummyData = {
  response: {
    header: {
      resultCode: '0000',
      resultMsg: 'OK',
    },
    body: {
      items: {
        item: [
          {
            contentid: '2024432',
            contenttypeid: '12',
            serialnum: '0',
            infoname: '개방 구간',
            infotext:
              '저두 출렁다리 : 438m / 도보 10분 소요 <br />\n망호 출렁다리 : 716m /  도보 15분 소요',
            fldgubun: '1',
          },
          {
            contentid: '2024432',
            contenttypeid: '12',
            serialnum: '1',
            infoname: '등산로',
            infotext: '"함께해(海)길"(2.5Km) / 도보1시간 ~ 1시간 30분 소요',
            fldgubun: '1',
          },
          {
            contentid: '2024432',
            contenttypeid: '12',
            serialnum: '2',
            infoname: '이용가능시설',
            infotext:
              '[기반시설] 청자타워(짚트랙), 낚시공원, 출렁다리 등<br />\n[편의시설] 화장실 2개소(저두쪽, 망호쪽), 슈퍼 2개 등',
            fldgubun: '3',
          },
        ],
      },
      numOfRows: 3,
      pageNo: 1,
      totalCount: 3,
    },
  },
};
const rawDummyString = JSON.stringify(rawDummyData);
const dummyData1 = JSON.parse(rawDummyString).response.body.items.item;
const data: DetailInfoData[] = dummyData1.map((e) => {
  return {
    infoname: e.infoname,
    infotext: e.infotext,
  };
});

const dummyDataSet = {
  DummyAccData,
  DummyActivitiesData,
  DummyCultureData,
  DummyRestaurantData,
  DummyShoppingData,
  DummyWithPetsInfo,
  dummyData,
  roomsData,
  rawDummyData,
  rawDummyString,
  dummyData1,
  data,
};

export default dummyDataSet;
