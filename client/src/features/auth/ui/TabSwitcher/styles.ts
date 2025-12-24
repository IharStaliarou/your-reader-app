import type { SystemStyleObject } from '@mui/system';
import { APP_COLORS } from '@/shared/constants/color.constants';

export const groupSx: Record<string, any> = {
  // TODO: fix types
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '60px',
  backgroundColor: APP_COLORS.paper,
  padding: '4px',
  boxShadow: '0 8px 24px rgba(31, 93, 47, 0.15)',
  border: `1px solid rgba(31, 93, 47, 0.12)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '4px',
    width: 'calc(50% - 8px)',
    height: 'calc(100% - 8px)',
    background: 'var(--gradient-green-soft)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 0,
    boxShadow: '0 4px 12px rgba(31, 93, 47, 0.2)',
  },
};

export const buttonBaseSx: SystemStyleObject = {
  position: 'relative',
  zIndex: 1,
  border: 'none',
  background: 'none',
  padding: '8px 24px',
  width: '50%',
  transition: 'color 0.3s ease',
};
