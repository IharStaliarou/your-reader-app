import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useFileStore } from '@/features/file/store/file.store';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { FileContentBody } from '@/features/file/ui/FileContentBody/FileContentBody';

export const FileContentPage = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();
  const { setActiveFileId, clearActiveFileId } = useFileStore();

  if (!fileId) {
    return <Alert severity='error'>File ID is missing.</Alert>;
  }

  useEffect(() => {
    setActiveFileId(fileId);
    return () => clearActiveFileId();
  }, [fileId, setActiveFileId, clearActiveFileId]);

  return (
    <Box className='flex flex-col gap-4 sm:gap-6'>
      <Box className='flex flex-col gap-3 sm:gap-4'>
        <AppButton
          label='Back to My Files'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          className='w-full sm:w-60'
        />
      </Box>

      <FileContentBody fileId={fileId} />
    </Box>
  );
};
