export const AppRoutePaths = {
  ROOT: { id: 'root', path: '/' },
  AUTH: { id: 'auth', path: '/auth' },
  VERIFY: { id: 'verify', path: '/verify' },
  FILES: { id: 'files', path: '/files' },
  FILE_CONTENT: { id: 'file-content', path: '/files/:fileId' },
  UPLOAD: { id: 'upload', path: '/upload' },
  PROFILE: { id: 'profile', path: '/profile' },
} as const;
