import { Box, Typography } from '@mui/material';

import { FileUploadForm } from '@features/file/ui/FileUploadForm/FileUploadForm';

const UploadPage = () => {
  return (
    <Box className='flex flex-col  bg-gray-100 p-8'>
      <Typography variant='h4' component='h1' className=''>
        Upload a new file
      </Typography>
      <FileUploadForm className='my-auto' />
    </Box>
  );
};

export default UploadPage;
