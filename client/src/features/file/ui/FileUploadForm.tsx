import { useState, useCallback, useRef, type ChangeEvent } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast } from 'react-toastify';

import { useUploadFileMutation } from '../api/file.api';
import { isAllowedFileType } from '@/shared/utils/file.utils';
import { UploadStatus } from './UploadStatus';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

export const FileUploadForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    mutate: uploadMutate,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useUploadFileMutation();

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      reset();
      const file = event.target.files?.[0];
      if (!file) {
        setSelectedFile(null);
        return;
      }
      if (isAllowedFileType(file)) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        toast.error('Invalid file type. Please select a PDF or TXT file.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [reset]
  );

  const handleUpload = () => {
    if (isError) reset();
    if (selectedFile) {
      uploadMutate({ file: selectedFile });
    }
  };

  return (
    <Box className='p-6 border rounded-lg shadow-md max-w-md mx-auto'>
      <Typography variant='h6' gutterBottom>
        Upload Document (PDF or TXT)
      </Typography>

      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept='.pdf,.txt'
      />
      <AppButton
        label={selectedFile ? selectedFile.name : 'Select File'}
        variant='outlined'
        startIcon={<UploadFileIcon />}
        fullWidth
        onClick={() => fileInputRef.current?.click()}
        className='mb-4'
      />
      <AppButton
        label={
          isPending ? <CircularProgress size={24} color='inherit' /> : 'Upload'
        }
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleUpload}
        disabled={!selectedFile || isPending}
      />

      <UploadStatus
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        fileName={selectedFile?.name || null}
      />
    </Box>
  );
};
