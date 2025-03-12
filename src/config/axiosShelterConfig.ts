import axios from 'axios';
const VITE_SHELTER_BASE_URL = import.meta.env.VITE_SHELTER_BASE_URL;
const ADOPTION_API_KEY = import.meta.env.VITE_SHELTER_API_KEY;
const shelterAPI = axios.create({
  baseURL: VITE_SHELTER_BASE_URL,
  timeout: 5000,
  params: {
    serviceKey: ADOPTION_API_KEY,
    _type: 'json',
  },
});

export default shelterAPI;
