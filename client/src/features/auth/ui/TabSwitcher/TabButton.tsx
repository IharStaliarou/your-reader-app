import { ToggleButton } from '@mui/material';
import { buttonBaseSx } from './styles';
import { type AuthModeType } from '@/shared/constants/api.constants';

interface TabButtonProps {
  value: AuthModeType;
  children: React.ReactNode;
  borderRadius: string;
}

export const TabButton = ({
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
          color: 'white',
          background: 'none',
        },
        '&.Mui-selected:hover': {
          background: 'none',
        },
        color: '#666',
      }}
    >
      {children}
    </ToggleButton>
  );
};
