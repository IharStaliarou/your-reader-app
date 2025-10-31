import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import { type IAppRoute } from '@/shared/interfaces/routes.interface';
import { AppRoutePaths } from '@/shared/constants/routes.constants';
import LandingPage from '@pages/landing/LandingPage';
import AuthPage from '@pages/auth/AuthPage';
import VerificationPage from '@pages/verification/VerificationPage';
import FilesPage from '@/pages/files/FilesPage';
import UploadPage from '@/pages/upload/UploadPage';
import { FileContentPage } from '@/pages/file-content/FileContentPage';

export const routeConfig: IAppRoute[] = [
  {
    id: 'main_layout',
    path: AppRoutePaths.ROOT.path,
    element: <AppLayout />,
    children: [
      // ===PUBLIC ROUTES===
      {
        id: AppRoutePaths.ROOT.id,
        path: AppRoutePaths.ROOT.path,
        element: <LandingPage />,
      },
      {
        id: AppRoutePaths.AUTH.id,
        path: AppRoutePaths.AUTH.path,
        element: <AuthPage />,
      },
      {
        id: AppRoutePaths.VERIFY.id,
        path: AppRoutePaths.VERIFY.path,
        element: <VerificationPage />,
      },
      {
        id: AppRoutePaths.FILES.id,
        path: AppRoutePaths.FILES.path,
        element: <FilesPage />,
      },
      {
        id: AppRoutePaths.FILE_CONTENT.id,
        path: AppRoutePaths.FILE_CONTENT.path,
        element: <FileContentPage />,
      },
      {
        id: AppRoutePaths.UPLOAD.id,
        path: AppRoutePaths.UPLOAD.path,
        element: <UploadPage />,
      },
      // ===PROTECTED ROUTES===
      {
        id: 'protected_group',
        path: AppRoutePaths.ROOT.path,
        element: <ProtectedRoute />,
        children: [
          {
            id: AppRoutePaths.PROFILE.id,
            path: AppRoutePaths.PROFILE.path,
            element: <div>Profile page</div>,
          },
        ],
      }, // TODO: add 404 page
    ],
  },
];
