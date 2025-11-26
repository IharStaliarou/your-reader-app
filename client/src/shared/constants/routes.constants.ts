export const AppRoutePaths = {
  ROOT: { id: 'root', path: '/' },
  AUTH: {
    id: 'auth',
    path: '/auth/*',
    SIGN_IN: { id: 'sign-in', path: 'sign-in' },
    SIGN_UP: { id: 'sign-up', path: 'sign-up' },
  },

  VERIFY: { id: 'verify', path: '/verify' },
  FILES: { id: 'files', path: '/files' },
  FILE_CONTENT: { id: 'file-content', path: '/files/:fileId' },
  UPLOAD: { id: 'upload', path: '/upload' },
  PROFILE: { id: 'profile', path: '/profile' },
} as const;

export const RouteGroupIds = {
  MAIN_LAYOUT: 'main_layout',
  PROTECTED_GROUP: 'protected_group',
} as const;
