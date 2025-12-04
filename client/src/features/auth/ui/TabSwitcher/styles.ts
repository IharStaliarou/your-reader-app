import type { SystemStyleObject } from '@mui/system';

export const groupSx: Record<string, any> = {
  // TODO: fix types
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '60px',
  backgroundColor: '#f5f5f5',
  padding: '4px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '4px',
    width: 'calc(50% - 8px)',
    height: 'calc(100% - 8px)',
    background: 'linear-gradient(171.6deg, #ff7b4e, #ff584e)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 0,
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
