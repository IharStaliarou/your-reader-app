import { Box } from '@mui/material';
import { APP_COLORS } from '@/shared/constants/color.constants';

export const Footer = () => {
  return (
    <footer>
      <Box
        className='p-4 text-center text-sm rounded-[24px]'
        sx={{
          color: APP_COLORS['text-muted'],
          backgroundColor: APP_COLORS.paper,
          border: `1px solid rgba(27, 23, 22, 0.08)`,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
        }}
      >
        © 2025 YOUR READER. All rights reserved.
      </Box>
    </footer>
  );
};
