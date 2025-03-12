import PNG_IMAGES from '../../../public/PNG-Image/image.ts';

const mockupImageURL = PNG_IMAGES.recommendRoom;

const MOCK_RECOMMENDED_ROOM = {
  imageURL: mockupImageURL,
  roomtitle: '별채 A',
  roomsize: 5, // 평
  roomsize2: 17, // 평방미터
  roomcount: 0,
  roombasecount: 4,
  roommaxcount: 7,
  roomoffseasonminfee1: 100000,
  roomintro:
    '※ 위 정보는 2024년 10월에 작성된 정보로(정상요금), 해당 숙박시설 이용요금이 수시로 변동됨에 따라 이용요금 및 기타 자세한 사항은 홈페이지 참조 요망',
} as const;
export default MOCK_RECOMMENDED_ROOM;
