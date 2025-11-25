import { useState } from 'react';
import { Box } from '@mui/material';

import { TabSwitcher, type AuthMode } from '../TabSwitcher/TabSwitcher';
import { AuthForms } from '../AuthForms/AuthForms';

export const AuthFormTabs = () => {
  const [mode, setMode] = useState<AuthMode>('sign-in');

  const handleSignUpSuccess = () => {
    setMode('sign-in');
  };

  return (
    <Box className='flex flex-col items-center justify-center'>
      <TabSwitcher mode={mode} onModeChange={setMode} />
      <AuthForms mode={mode} onSignUpSuccess={handleSignUpSuccess} />
    </Box>
  );
};
