import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { type ISignInData, type ICreateUserData } from '../lib/validation';
import {
  API_BASE_URL,
  API_SIGN_UP_URL,
  API_VERIFY_URL,
} from '@constants/url.constants';
import { sendVerificationEmail } from '@api/emailjs.api';

const $api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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

const verifyEmail = async (token: string) => {
  const response = await $api.post(API_VERIFY_URL, { token });
  return response.data;
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
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
