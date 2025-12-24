import type { ReactNode } from 'react';
import { ToggleButton } from '@mui/material';
import { buttonBaseSx } from './styles';
import { type AuthModeType } from '@/shared/constants/api.constants';
import { APP_COLORS } from '@/shared/constants/color.constants';

interface TabButtonProps {
  label: string;
  value: AuthModeType;
  children?: ReactNode;
  borderRadius: string;
}

export const TabButton = ({
  label,
  value,
  children,
  borderRadius,
}: TabButtonProps) => {
  return (
    <ToggleButton
      value={value}
      sx={{
        ...buttonBaseSx,
        borderRadius,
        '&.Mui-selected': {
          color: APP_COLORS['main-white'],
          background: 'none',
        },
        '&.Mui-selected:hover': {
          background: 'none',
        },
        color: APP_COLORS['text-muted'],
      }}
    >
      {label} {children}
    </ToggleButton>
  );
};
