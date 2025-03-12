import PNG_IMAGES from '../../../public/PNG-Image/image.ts';

const mockupImageURL = PNG_IMAGES.recommendRoom;

const MOCK_TRAVEL_REVIEW = {
  imageURL: mockupImageURL,
  reviewID: 123,
  content: '가람초연재는 참 고즈넉하니 예쁘네요. 우꺄꺄',
} as const;
export default MOCK_TRAVEL_REVIEW;
