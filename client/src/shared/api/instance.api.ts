import axios from 'axios';
import { API_BASE_URL, API_REFRESH_TOKENS_URL } from '@constants/url.constants';

let onLogoutCallback: (() => void) | null = null;

export const setOnSignOutCallback = (callback: () => void) => {
  onLogoutCallback = callback;
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
  async (error) => {
    const originalRequest = error.config;
    if (error.config.url === API_REFRESH_TOKENS_URL) {
      console.error('Refresh token itself failed. Initiating full signout.');
      if (onLogoutCallback) {
        onLogoutCallback();
      } else {
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      originalRequest &&
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

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
