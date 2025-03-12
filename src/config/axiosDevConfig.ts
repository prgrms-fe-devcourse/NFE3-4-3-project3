import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import PATH from '@/constants/path';
const DEV_SERVER_URL = import.meta.env.VITE_API_BASE_URL;
const devAPI = axios.create({
  baseURL: DEV_SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청시 처리 ----------
const onRequest = (config: InternalAxiosRequestConfig) => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    config.headers.Authorization = `bearer ${jwt}`;
  }
  return config;
};

const onErrorRequest = (error: AxiosError | Error) => {
  return Promise.reject(error);
};

// 응답시 처리 ----------
const onResponse = (response: AxiosResponse) => response;

// 공통 에러 처리---------
const onError = (status: number, custom_message: string, message: string) => {
  const error = { status, custom_message, message };
  throw error;
};
const handleAuthError = async (originalRequest: InternalAxiosRequestConfig) => {
  if (!originalRequest.headers['Authorization']) return;
  const hasToken = originalRequest.headers['Authorization'].toString().split(' ')[1];
  if (hasToken) {
    alert('사용자 정보가 만료되었습니다.홈으로 이동합니다.');
    // jwt를 지우고 홈으로 이동
    localStorage.removeItem('jwt');
    window.location.href = PATH.root;
  } else {
    alert('사용자 정보를 찾을 수 없습니다. 로그인 페이지로 이동합니다.');
    // jwt를 지우고 로그인 페이지로 이동
    localStorage.removeItem('jwt');
    window.location.href = PATH.login;
  }
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  console.log(error);
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const origianlRequest = error.config as InternalAxiosRequestConfig;
    const { method, url } = error.config as InternalAxiosRequestConfig;
    const { status, statusText } = error.response as AxiosResponse;

    console.log(
      `[API] ${method?.toUpperCase()} ${url} | ERROR ${status} ${statusText} | ${message}`,
    );
    switch (status) {
      case 401:
        handleAuthError(origianlRequest);
        break;
      case 403:
        onError(status, '권한이 없습니다.', message);
        break;
      case 404:
        onError(status, '잘못된 요청입니다.', message);
        break;
      case 500:
        onError(status, '서버에 문제가 발생했습니다', message);
        break;
      default:
        onError(status, '알수없는 에러가 발생했습니다.', message);
        break;
    }
  } else {
    console.log(`[API] | ERROR ${error.toString()}`);
    onError(0, '에러가 발생했습니다.', '');
  }
  return Promise.reject(error);
};

devAPI.interceptors.request.use(onRequest, onErrorRequest);
devAPI.interceptors.response.use(onResponse, onErrorResponse);
export default devAPI;
