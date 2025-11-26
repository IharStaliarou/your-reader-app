import {
  APP_PATHS,
  AUTH_TYPES,
  type AuthModeType,
} from '../constants/api.constants';

/**
 * Get the initial auth mode based on the current pathname
 * @param {string} pathname - The current pathname
 * @returns {AuthModeType} The initial auth mode
 */

export const getInitialAuthMode = (pathname: string): AuthModeType => {
  if (pathname.includes(APP_PATHS.AUTH.SIGN_UP)) {
    return AUTH_TYPES.SIGN_UP;
  }
  return AUTH_TYPES.SIGN_IN;
};
