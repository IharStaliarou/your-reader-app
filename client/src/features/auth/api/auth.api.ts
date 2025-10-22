import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { sendVerificationEmail } from '@api/emailjs.api';
import { $api } from '@/shared/api/instance.api';
import {
  signInUser,
  signOutUser,
  signUpUser,
  verifyEmail,
  type IAuthResponse,
} from './auth.methods';

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const useSignInMutation = (navigate: (path: string) => void) => {
  // TODO: add useNavigate
  return useMutation({
    mutationFn: signInUser,
    // TODO: add type for data
    onSuccess: (data: IAuthResponse) => {
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/profile');
      toast.success('You have successfully signed in.');
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message || 'Uncorrect username or password';
      toast.error(`Error signing in: ${message}`);
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
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
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        'Uncorrect username, email or password';
      toast.error(`Error signing up: ${message}`);
    },
  });
};

export const useSignOutMutation = (navigate: (path: string) => void) => {
  return useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      toast.success('You have successfully signed out.');
      localStorage.removeItem('accessToken');
      navigate('/');
    },
    onError: (error: any) => {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out. Please try again.');
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
