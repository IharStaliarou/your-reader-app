import { Box } from '@mui/material';

import { Header } from '@/widgets/Header/Header';
import { FileUploadForm } from '@features/file/ui/FileUploadForm';

const UploadPage = () => {
  return (
    <Box className='min-h-screen flex flex-col bg-gray-100'>
      <Header />
      <Box className='grow flex items-center justify-center p-8'>
        <FileUploadForm />
      </Box>
    </Box>
  );
};

export default UploadPage;
