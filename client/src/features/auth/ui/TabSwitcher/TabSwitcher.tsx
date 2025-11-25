import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import type { MouseEvent } from 'react';

export type AuthMode = 'sign-in' | 'sign-up';

interface ITabSwitcherProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export const TabSwitcher = ({ mode, onModeChange }: ITabSwitcherProps) => {
  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    newMode: AuthMode | null
  ) => {
    if (newMode !== null) {
      onModeChange(newMode);
    }
  };

  return (
    <Box className='mb-6'>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleChange}
        color='primary'
        className='bg-white rounded-full shadow-lg'
      >
        <ToggleButton value='sign-in'>Sign in</ToggleButton>
        <ToggleButton value='sign-up'>Sign up</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
