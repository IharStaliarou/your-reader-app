import { type AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { sendVerificationEmail } from '@api/emailjs.api';
import {
  signInUser,
  signOutUser,
  signUpUser,
  verifyEmail,
} from './auth.methods';
import type {
  IAuthResponse,
  ISignUpResponse,
} from '@shared/interfaces/auth.interface';
import { extractErrorMessage } from '@/shared/utils/error.utils';

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signInUser,
    onSuccess: (data: IAuthResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      toast.success('You have successfully signed in.');
      return data;
    },
    onError: (error: AxiosError<any>) => {
      const message = extractErrorMessage(
        error,
        'Incorrect username or password'
      );
      toast.error(`Error signing in: ${message}`);
      return Promise.reject(error);
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data: ISignUpResponse) => {
      sendVerificationEmail(data.user.email, data.token, data.user.userName)
        .then(() => {
          toast.success(
            'You have successfully signed up. Please check your email for verification.'
          );
        })
        .catch((e) => {
          console.error('Error sending email: ', e);
          // TODO: add functional for resend verification link
          toast.error(
            'You have successfully signed up, but verification email could not be sent. Please try again.'
          );
        });
    },
    onError: (error: AxiosError<any>) => {
      const message = extractErrorMessage(
        error,
        'Incorrect data provided during sign up'
      );
      toast.error(`Error signing up: ${message}`);
      return Promise.reject(error);
    },
  });
};

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      queryClient.clear();
      toast.success('You have successfully signed out.');
    },
    onError: (error: AxiosError<any>) => {
      localStorage.removeItem('accessToken');
      queryClient.clear();
      toast.error('Failed to sign out. Local session cleared.');
      return Promise.reject(error);
    },
  });
};

export const useVerifyMutation = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onError: (error: any) => {
      console.error('Verification error:', error);
      return Promise.reject(error);
    },
  });
};
