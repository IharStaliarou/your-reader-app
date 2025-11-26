import type { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

import {
  AUTH_TYPES,
  type AuthModeType,
} from '@/shared/constants/api.constants';

interface ITabSwitcherProps {
  mode: AuthModeType;
  onModeChange: (mode: AuthModeType) => void;
}

export const TabSwitcher = ({ mode, onModeChange }: ITabSwitcherProps) => {
  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    newMode: AuthModeType | null
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
        <ToggleButton value={AUTH_TYPES.SIGN_IN}>Sign in</ToggleButton>
        <ToggleButton value={AUTH_TYPES.SIGN_UP}>Sign up</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
