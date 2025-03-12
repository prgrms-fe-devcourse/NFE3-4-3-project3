import axios from 'axios';

const baseURL = import.meta.env.VITE_TOUR_BASE_URL;
const serviceKey = import.meta.env.VITE_TOUR_API_KEY;

const tourAPI = axios.create({
  baseURL,
  timeout: 10000,
  params: {
    numOfRows: 10,
    serviceKey,
    MobileOS: 'WIN',
    MobileApp: 'PETNER',
    _type: 'JSON',
  },
});

tourAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status !== 200) {
      alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
    return Promise.reject(error);
  },
);

export default tourAPI;
