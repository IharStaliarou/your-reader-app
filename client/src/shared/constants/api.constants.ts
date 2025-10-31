/* frontend endpoints */
export const CLIENT_URL = 'http://localhost:5173';
export const VERIFY_TOKEN_URL = (token: string) =>
  `${CLIENT_URL}/verify?token=${token}`;

// TODO: create paths object
/* backend endpoints */
/* auth endpoints */
export const API_BASE_URL = 'http://localhost:3000/api';
export const API_SIGN_UP_URL = `${API_BASE_URL}/auth/signup`;
export const API_SIGN_IN_URL = `${API_BASE_URL}/auth/signin`;
export const API_SIGN_OUT_URL = `${API_BASE_URL}/auth/signout`;

export const API_VERIFY_URL = `${API_BASE_URL}/auth/verify`;
export const API_REFRESH_TOKENS_URL = `${API_BASE_URL}/token/refresh-tokens`;

/* file endpoints */
export const API_FILES_URL = `${API_BASE_URL}/files`;
export const API_GET_FILES_URL = `${API_FILES_URL}/all`;
export const API_GET_FILE_CONTENT_URL = (fileId: string) =>
  `${API_FILES_URL}/${fileId}/content`;
export const API_UPLOAD_FILE_URL = `${API_FILES_URL}/upload`;

/* other */
export const MULTER_FIELD_NAME = 'file';
