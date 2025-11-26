import { Box, Container, Typography } from '@mui/material';

import { FileUploadForm } from '@/features/file/ui/FileUploadForm';
import { FilesList } from '@/features/file/ui/FilesList';

const FilesPage = () => {
  return (
    <Container maxWidth='md' className='py-8'>
      <Typography variant='h4' component='h1' gutterBottom>
        Select a new file
      </Typography>

      <Box className='mb-8'>
        <FileUploadForm />
      </Box>

      <FilesList />
    </Container>
  );
};

export default FilesPage;
