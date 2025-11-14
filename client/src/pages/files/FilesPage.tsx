import { Box, Container, Typography } from '@mui/material';

import { FileUploadForm } from '@/features/file/ui/FileUploadForm';
import { FilesList } from '@/features/file/ui/FilesList';

const FilesPage = () => {
  return (
    <Container maxWidth='md' className='py-8'>
      <Typography variant='h3' component='h1' gutterBottom>
        My Documents
      </Typography>

      <Box className='mb-8'>
        <FileUploadForm />
      </Box>

      <Typography variant='h4' component='h2' className='mt-10' gutterBottom>
        Uploaded Files (Placeholder)
      </Typography>
      <FilesList />
    </Container>
  );
};

export default FilesPage;
