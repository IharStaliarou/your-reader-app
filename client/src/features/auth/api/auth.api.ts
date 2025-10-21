import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { type ISignInData, type ICreateUserData } from '../lib/validation';
import {
  API_BASE_URL,
  API_REFRESH_TOKENS_URL,
  API_SIGN_OUT_URL,
  API_SIGN_UP_URL,
  API_VERIFY_URL,
} from '@constants/url.constants';
import { sendVerificationEmail } from '@api/emailjs.api';

let onLogoutCallback: (() => void) | null = null;

export const setOnLogoutCallback = (callback: () => void) => {
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

const signInUser = async (data: ISignInData) => {
  const response = await $api.post(`${API_BASE_URL}/auth/signin`, data);
  return response.data;
};

const signUpUser = async (data: ICreateUserData) => {
  const response = await $api.post(`${API_SIGN_UP_URL}`, data);
  return response.data as {
    user: { email: string; userName: string };
    token: string;
  };
};

const signOutUser = async () => {
  const response = await $api.get(`${API_SIGN_OUT_URL}`);
  return response.data;
};

const verifyEmail = async (token: string) => {
  const response = await $api.post(API_VERIFY_URL, { token });
  return response.data;
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signInUser,
    // TODO: add type for data
    onSuccess: (data: any) => {
      localStorage.setItem('accessToken', data?.accessToken);
      window.location.href = '/profile'; // TODO: change on navigate
      alert('You have successfully signed in.'); // TODO: add toaster
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Uncorrect username or password';
      alert(`Error signing in: ${message}`);
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      sendVerificationEmail(data.user.email, data.token, data.user.userName)
        .then(() => {
          alert(
            'You have successfully signed up. Please check your email for verification.' // TODO: add toaster
          );
        })
        .catch((e) => {
          console.error('Error sending email: ', e);
          alert(
            'You have successfully signed up, but verification email could not be sent. Please try again.'
          );
        });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        'Uncorrect username, email or password';
      alert(`Error signing up: ${message}`);
    },
  });
};

export const useSignOutMutation = (navigate: (path: string) => void) => {
  return useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      alert('You have successfully signed out.');
      localStorage.removeItem('accessToken');
      navigate('/');
    },
    onError: (error: any) => {
      console.error('Sign out error:', error);
      alert('Failed to sign out. Please try again.');
    },
  });
};

export const useVerifyMutation = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onError: (error: any) => {
      console.error('Verification error:', error);
      return {
        message:
          error.response?.data?.message || 'Link is invalid or has expired.',
      };
    },
  });
};
