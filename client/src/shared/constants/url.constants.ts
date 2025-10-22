/* frontend endpoints */
export const CLIENT_URL = 'http://localhost:5173';

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
export const API_FILE_UPLOAD_URL = `${API_BASE_URL}/files/upload`;
