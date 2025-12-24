import { Box, Typography } from '@mui/material';

import { FileUploadForm } from '@features/file/ui/FileUploadForm/FileUploadForm';
import { SurfaceCard } from '@/shared/ui/SurfaceCard/SurfaceCard';
import { APP_COLORS } from '@/shared/constants/color.constants';

const UploadPage = () => {
  return (
    <Box
      className='flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8'
      sx={{ background: 'transparent', color: APP_COLORS['main-black'] }}
    >
      <Typography
        variant='h4'
        component='h1'
        sx={{ fontSize: { xs: '22px', md: '32px' } }}
      >
        Upload a new file
      </Typography>
      <SurfaceCard padding='var(--space-md)'>
        <FileUploadForm />
      </SurfaceCard>
    </Box>
  );
};

export default UploadPage;
