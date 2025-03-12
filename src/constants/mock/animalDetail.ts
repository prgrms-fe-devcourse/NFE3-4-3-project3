import PNG_IMAGES from '../../../public/PNG-Image/image';
const mockImageSrc = PNG_IMAGES.dog;

const ANIMAL_DETAIL = {
  kindCd: '[개] 믹스견',
  desertionNo: '444450202101068',
  colorCd: '갈색',
  age: '2019(년생)',
  weight: '5(Kg)',
  noticeNo: '충남-공주-2022-00001',
  noticeSdt: '20220104',
  noticeEdt: '20220117',
  popfile: mockImageSrc,
  processState: '보호중',
  sexCd: 'M',
  neuterYn: 'N',
  specialMark: '파란색목줄착용, 겁이많음, 진드기, 털엉킴, 치석증',
} as const;

export default ANIMAL_DETAIL;
