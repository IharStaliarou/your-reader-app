import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import {
  API_BASE_URL,
  API_REFRESH_TOKENS_URL,
} from '@/shared/constants/api.constants';
import { signOutCleanupGlobal } from '@/features/auth/store/auth.store';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

let isRefreshing = false;
const refreshSubscribers: ((accessToken: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (accessToken: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers.length = 0;
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
    const isRefreshEndpoint = originalRequest.url === API_REFRESH_TOKENS_URL;

    if (
      error.response &&
      error.response.status === 401 &&
      !isRefreshEndpoint &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await $api.get(`${API_REFRESH_TOKENS_URL}`);
          const newAccessToken = response.data.accessToken;

          localStorage.setItem('accessToken', newAccessToken);

          onRefreshed(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return $api.request(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token failed: Session expired', refreshError);
          signOutCleanupGlobal();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          resolve($api.request(originalRequest));
        });
      });
    }

    if (isRefreshEndpoint && error.response?.status === 401) {
      signOutCleanupGlobal();
    }

    return Promise.reject(error);
  }
);
