import { useState, useCallback, useRef, type ChangeEvent } from 'react';
import { Box, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast } from 'react-toastify';

import { useUploadFileMutation } from '../../api/file.api';
import { UploadStatus } from '../UploadStatus/UploadStatus';
import { isAllowedFileType } from '@/shared/utils/file.utils';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

interface IFileUploadFormProps {
  className?: string;
}

export const FileUploadForm = ({ className }: IFileUploadFormProps) => {
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
      setSelectedFile(null);
    }
  };

  return (
    <Box
      className={`${className} w-full max-w-2xl mx-auto`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <Typography variant='h6' gutterBottom>
        Choose your new file (PDF or TXT)
      </Typography>

      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept='.pdf,.txt'
      />
      <Box className='flex flex-col gap-2'>
        <AppButton
          label={selectedFile ? selectedFile.name : 'Select File'}
          variant='outlined'
          startIcon={<UploadFileIcon />}
          onClick={() => fileInputRef.current?.click()}
          className='mb-4'
        />
        <AppButton
          label={isPending ? 'Uploading...' : 'Upload'}
          isLoading={isPending}
          variant='contained'
          onClick={handleUpload}
          disabled={!selectedFile || isPending}
        />
        {selectedFile && (
          <AppButton
            label='Clear'
            variant='outlined'
            onClick={() => setSelectedFile(null)}
          />
        )}
      </Box>

      <UploadStatus
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        fileName={selectedFile?.name || null}
      />
    </Box>
  );
};
