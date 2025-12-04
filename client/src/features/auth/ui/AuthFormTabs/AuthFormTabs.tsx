import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { TabSwitcher } from '../TabSwitcher/TabSwitcher';
import { AuthForms } from '../AuthForms/AuthForms';
import {
  APP_PATHS,
  AUTH_TYPES,
  type AuthModeType,
} from '@/shared/constants/api.constants';
import { getInitialAuthMode } from '@/shared/utils/auth.utils';

export const AuthFormTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentMode = getInitialAuthMode(location.pathname);

  const handleModeChange = (newMode: AuthModeType) => {
    const path =
      newMode === AUTH_TYPES.SIGN_IN
        ? APP_PATHS.AUTH.SIGN_IN
        : APP_PATHS.AUTH.SIGN_UP;
    navigate(path);
  };

  const handleSignUpSuccess = () => {
    navigate(APP_PATHS.AUTH.SIGN_IN);
  };

  return (
    <Box className='flex flex-col items-center h-full'>
      <TabSwitcher
        mode={currentMode}
        onModeChange={handleModeChange}
        className='bg-white rounded-full'
      />
      <AuthForms
        mode={currentMode}
        onSignUpSuccess={handleSignUpSuccess}
        className='my-auto'
      />
    </Box>
  );
};
