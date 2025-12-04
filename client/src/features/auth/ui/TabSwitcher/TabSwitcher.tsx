import type { MouseEvent } from 'react';
import { ToggleButtonGroup } from '@mui/material';

import {
  AUTH_TYPES,
  type AuthModeType,
} from '@/shared/constants/api.constants';
import { TabButton } from './TabButton';
import { groupSx } from './styles';

interface ITabSwitcherProps {
  mode: AuthModeType;
  onModeChange: (mode: AuthModeType) => void;
  className?: string;
}

export const TabSwitcher = ({
  mode,
  onModeChange,
  className,
}: ITabSwitcherProps) => {
  const handleChange = (
    _event: MouseEvent<HTMLElement>,
    newMode: AuthModeType | null
  ) => {
    if (newMode !== null) {
      onModeChange(newMode);
    }
  };

  const isSignIn = mode === AUTH_TYPES.SIGN_IN;

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleChange}
      className={className}
      sx={{
        ...groupSx,
        '&::before': {
          ...groupSx['&::before'],
          left: isSignIn ? '4px' : 'calc(50% + 4px)',
          borderRadius: isSignIn ? '60px 0 0 60px' : '0 60px 60px 0',
        },
      }}
    >
      <TabButton value={AUTH_TYPES.SIGN_IN} borderRadius='60px 0 0 60px'>
        Sign in
      </TabButton>

      <TabButton value={AUTH_TYPES.SIGN_UP} borderRadius='0 60px 60px 0'>
        Sign up
      </TabButton>
    </ToggleButtonGroup>
  );
};
