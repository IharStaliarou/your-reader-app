import { ICookieOptions } from '@token/interfaces/interfaces';

export const getCookieOptions = (expires: Date): ICookieOptions => {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/',
    expires,
  };
};
