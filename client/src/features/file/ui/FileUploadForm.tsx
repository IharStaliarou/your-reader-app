import React, { useState, useCallback } from 'react';
import { Button, Box, Typography, Input } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { toast } from 'react-toastify';

import { useUploadFileMutation } from '../api/file.api';

export const FileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending } = useUploadFileMutation();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setFile(event.target.files[0]);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (file) {
        mutate({ file });
      } else {
        toast.warn('Please select a file to upload.');
      }
    },
    [file, mutate]
  );

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 p-8 bg-white shadow-xl rounded-lg w-full max-w-lg'
    >
      <Typography
        variant='h5'
        component='h2'
        className='text-center font-bold text-gray-800'
      >
        Upload Document
      </Typography>

      <label htmlFor='file-upload' className='cursor-pointer w-full'>
        <Box className='border-2 border-dashed border-indigo-300 rounded-lg p-10 flex flex-col items-center justify-center transition-colors hover:border-indigo-500'>
          <UploadFileIcon className='text-indigo-500 text-5xl mb-2' />
          <Typography variant='body1' className='text-gray-600'>
            {file ? file.name : 'Choose a PDF or TXT file'}
          </Typography>
          <Typography variant='caption' className='text-gray-400'>
            Max size 5MB
          </Typography>
        </Box>
      </label>

      <Input
        type='file'
        id='file-upload'
        inputProps={{ accept: '.pdf,.txt' }}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
        disabled={isPending || !file}
        className='py-3 bg-indigo-600 hover:bg-indigo-700'
      >
        {isPending ? 'Uploading...' : 'Upload File'}
      </Button>
    </Box>
  );
};
