import { Box, Container, Typography } from '@mui/material';

import { FileUploadForm } from '@/features/file/ui/FileUploadForm/FileUploadForm';
import { FilesList } from '@/features/file/ui/FilesList/FilesList';

const FilesPage = () => {
  return (
    <Container maxWidth='md' className='py-8'>
      <Typography variant='h4' component='h1' gutterBottom>
        Select a new file
      </Typography>

      <Box className='bg-gray-100 p-8 mb-8 rounded-[60px]'>
        <FileUploadForm />
      </Box>

      <FilesList />
    </Container>
  );
};

export default FilesPage;
