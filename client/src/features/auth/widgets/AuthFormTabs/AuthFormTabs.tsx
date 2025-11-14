import { useState, type MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

import { SignInForm } from '../../ui/SignInForm';
import { SignUpForm } from '../../ui/SignUpForm';

type AuthMode = 'sign-in' | 'sign-up';

export const AuthFormTabs = () => {
  const [mode, setMode] = useState<AuthMode>('sign-in');

  const handleModeChange = (
    event: MouseEvent<HTMLElement>,
    newMode: AuthMode | null
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleSignUpSuccess = () => {
    setMode('sign-up');
  };

  return (
    <Box className='flex flex-col items-center justify-center'>
      <Box className='mb-6'>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          color='primary'
          className='bg-white rounded-full shadow-lg'
        >
          {/* TODO: fix - two btn redirect to auth/signin */}
          <ToggleButton value='sign-in'>Sign in</ToggleButton>
          <ToggleButton value='sign-up'>Sign up</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {mode === 'sign-in' ? (
        <SignInForm />
      ) : (
        <SignUpForm onSuccess={handleSignUpSuccess} />
      )}
    </Box>
  );
};
