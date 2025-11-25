import { Box } from '@mui/material';

import { AuthFormTabs } from '@/features/auth/ui/AuthFormTabs/AuthFormTabs';

const AuthPage = () => {
  return (
    <Box className='min-h-screen flex items-center justify-center bg-gray-100'>
      <AuthFormTabs />
    </Box>
  );
};

export default AuthPage;
