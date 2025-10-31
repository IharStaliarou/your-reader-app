import { $api } from '@/shared/api/instance.api';
import {
  API_BASE_URL,
  API_SIGN_OUT_URL,
  API_SIGN_UP_URL,
  API_VERIFY_URL,
} from '@/shared/constants/api.constants';
import type { ISignInData, ICreateUserData } from '../lib/validation';
import type {
  IAuthResponse,
  ISignUpResponse,
} from '@/shared/interfaces/auth.interface';

export const signInUser = async (data: ISignInData): Promise<IAuthResponse> => {
  const response = await $api.post(`${API_BASE_URL}/auth/signin`, data);
  return response.data;
};

export const signUpUser = async (
  data: ICreateUserData
): Promise<ISignUpResponse> => {
  const response = await $api.post(`${API_SIGN_UP_URL}`, data);
  return response.data as ISignUpResponse;
};

export const signOutUser = async () => {
  const response = await $api.get(`${API_SIGN_OUT_URL}`);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await $api.post(API_VERIFY_URL, { token });
  return response.data;
};
