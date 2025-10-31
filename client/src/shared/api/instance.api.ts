import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import {
  API_BASE_URL,
  API_REFRESH_TOKENS_URL,
} from '@/shared/constants/api.constants';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

let onSignOutCallback: (() => void) | null = null;

export const setOnSignOutCallback = (callback: () => void) => {
  onSignOutCallback = callback;
};

const signOutCleanup = () => {
  localStorage.removeItem('accessToken');
  if (onSignOutCallback) {
    onSignOutCallback();
  } else {
    window.location.href = '/';
  }
};

export const $api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      originalRequest.url !== API_REFRESH_TOKENS_URL &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const response = await $api.get(`${API_REFRESH_TOKENS_URL}`);
        const newAccessToken = response.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return $api.request(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed: Session expired', refreshError);
        signOutCleanup();
        return Promise.reject(refreshError);
      }
    }
    if (
      error.config?.url === API_REFRESH_TOKENS_URL &&
      error.response?.status === 401
    ) {
      signOutCleanup();
    }

    return Promise.reject(error);
  }
);
