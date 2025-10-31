import type { AxiosError } from 'axios';

export const extractErrorMessage = (
  error: AxiosError<any> | undefined | null,
  defaultMessage: string
): string => {
  if (!error) {
    return defaultMessage;
  }
  return error.response?.data?.message || defaultMessage;
};
