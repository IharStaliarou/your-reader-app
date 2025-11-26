/* frontend endpoints */
export const CLIENT_URL = 'http://localhost:5173';
export const VERIFY_TOKEN_URL = (token: string) =>
  `${CLIENT_URL}/verify?token=${token}`;

export const APP_PATHS = {
  HOME: '/',
  PROFILE: '/profile',
  AUTH: {
    BASE: '/auth',
    SIGN_UP: '/auth/sign-up',
    SIGN_IN: '/auth/sign-in',
  },
} as const;

/* backend endpoints */
export const API_BASE_URL = 'http://localhost:3000/api';
export const MULTER_FIELD_NAME = 'file';

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_UP: `${API_BASE_URL}/auth/signup`,
    SIGN_IN: `${API_BASE_URL}/auth/signin`,
    SIGN_OUT: `${API_BASE_URL}/auth/signout`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
  },
  TOKENS: {
    REFRESH: `${API_BASE_URL}/token/refresh-tokens`,
  },
  FILES: {
    BASE: `${API_BASE_URL}/files`,
    GET_ALL_BY_USER: `${API_BASE_URL}/files/all`,
    UPLOAD: `${API_BASE_URL}/files/upload`,
    DELETE: (fileId: string) => `${API_BASE_URL}/files/${fileId}`,
    GET_FILE_CONTENT: (fileId: string) =>
      `${API_BASE_URL}/files/${fileId}/content`,
  },
  BOOKMARKS: {
    BASE: `${API_BASE_URL}/bookmarks`,
    GET_ALL_BY_FILE: (fileId: string) =>
      `${API_BASE_URL}/bookmarks/${MULTER_FIELD_NAME}/${fileId}`,
    DELETE: (bookmarkId: string) => `${API_BASE_URL}/bookmarks/${bookmarkId}`,
  },
} as const;

export const AUTH_TYPES = {
  SIGN_UP: 'sign-up',
  SIGN_IN: 'sign-in',
} as const;

export type AuthModeType =
  | (typeof AUTH_TYPES)['SIGN_UP']
  | (typeof AUTH_TYPES)['SIGN_IN'];
