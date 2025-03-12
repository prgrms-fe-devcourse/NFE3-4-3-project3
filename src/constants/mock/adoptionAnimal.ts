import PNG_IMAGES from '../../../public/PNG-Image/image';
const mockImageSrc = PNG_IMAGES.cat;

const ADOPTION_ANIMAL = {
  kindCd: '[개] 믹스견',
  desertionNo: 1234098745,
  noticeSdt: 20250217,
  noticeEdt: 20250317,
  popfile: mockImageSrc,
  specialMark: '빨간 바탕에 회색 테두리 목줄, 활발.온순. 양쪽귀뒤 탈모',
  sexCd: 'M',
} as const;
export default ADOPTION_ANIMAL;
