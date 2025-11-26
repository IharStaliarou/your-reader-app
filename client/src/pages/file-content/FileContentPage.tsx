import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useFileStore } from '@/features/file/store/file.store';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { FileContentBody } from '@/features/file/ui/FileContentBody';
import { useGetUserFilesQuery } from '@/features/file/api/file.api';
import { getCurrentFile, getFileTitle } from '@/shared/utils/file.utils';

export const FileContentPage = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();
  const { setActiveFileId, clearActiveFileId } = useFileStore();
  const { data: filesData } = useGetUserFilesQuery();
  const currentFile = getCurrentFile(filesData, fileId);

  if (!fileId) {
    return <Alert severity='error'>File ID is missing.</Alert>;
  }

  useEffect(() => {
    setActiveFileId(fileId);
    return () => clearActiveFileId();
  }, [fileId, setActiveFileId, clearActiveFileId]);

  return (
    <Box>
      <Box className='flex flex-col gap-5'>
        <AppButton
          label='Back to My Files'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          className='w-60'
        />
        <Typography variant='h4'>{getFileTitle(currentFile)}</Typography>
      </Box>

      <FileContentBody fileId={fileId} />
    </Box>
  );
};
