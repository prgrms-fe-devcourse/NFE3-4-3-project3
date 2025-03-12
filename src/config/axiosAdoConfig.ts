import axios from 'axios';
const ADOPTION_SERVER_URL = import.meta.env.VITE_ADOPTION_BASE_URL;
const ADOPTION_API_KEY = import.meta.env.VITE_SHELTER_API_KEY;
const adoAPI = axios.create({
  baseURL: ADOPTION_SERVER_URL,
  timeout: 5000, // 이게 맞아?
  params: {
    serviceKey: ADOPTION_API_KEY,
    _type: 'json',
  },
});

export default adoAPI;
