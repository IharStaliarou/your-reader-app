import { type AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  IVerifyResponse,
} from '@shared/interfaces/auth.interface';
import { extractErrorMessage } from '@/shared/utils/error.utils';
import { useAuthStore } from '../store/auth.store';
import { APP_PATHS } from '@/shared/constants/api.constants';

export const useSignInMutation = () => {
  const setIsSignedIn = useAuthStore((state) => state.setIsSignedIn);

  return useMutation({
    mutationFn: signInUser,
    onSuccess: (data: IAuthResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      setIsSignedIn(true);
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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      useAuthStore.getState().startSignOut();
      try {
        return await signOutUser();
      } catch (error) {
        console.error(
          'Sign Out failed on server side, proceeding with local cleanup.',
          error
        );
        throw error;
      }
    },
    onSuccess: () => {
      const { setIsSignedIn, finishSignOut } = useAuthStore.getState();

      localStorage.removeItem('accessToken');
      setIsSignedIn(false);
      finishSignOut();
      queryClient.clear();
      toast.success('You have successfully signed out.');
      navigate(APP_PATHS.HOME);
    },
    onError: (error: AxiosError<any>) => {
      const { setIsSignedIn, finishSignOut } = useAuthStore.getState();

      localStorage.removeItem('accessToken');
      setIsSignedIn(false);
      finishSignOut();
      queryClient.clear();
      toast.error('Failed to sign out. Local session cleared.');
      navigate(APP_PATHS.HOME);
      return Promise.reject(error);
    },
  });
};

export const useVerifyMutation = <T = IVerifyResponse>() => {
  return useMutation<T, AxiosError<any>, string>({
    mutationFn: verifyEmail,
    onError: (error: any) => {
      console.error('Verification error:', error);
      return Promise.reject(error);
    },
  });
};
