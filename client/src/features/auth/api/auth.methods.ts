import { $api } from '@/shared/api/instance.api';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';
import type { ISignInData, ICreateUserData } from '../lib/validation';
import type {
  IAuthResponse,
  ISignUpResponse,
} from '@/shared/interfaces/auth.interface';

export const signInUser = async (data: ISignInData): Promise<IAuthResponse> => {
  const response = await $api.post(API_ENDPOINTS.AUTH.SIGN_IN, data);
  return response.data;
};

export const signUpUser = async (
  data: ICreateUserData
): Promise<ISignUpResponse> => {
  const response = await $api.post(API_ENDPOINTS.AUTH.SIGN_UP, data);
  return response.data as ISignUpResponse;
};

export const signOutUser = async () => {
  const response = await $api.get(API_ENDPOINTS.AUTH.SIGN_OUT);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await $api.post(API_ENDPOINTS.AUTH.VERIFY, { token });
  return response.data;
};
