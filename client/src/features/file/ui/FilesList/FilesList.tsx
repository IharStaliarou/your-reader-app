import { AxiosError } from 'axios';
import { CircularProgress, Typography, Grid, Box, Alert } from '@mui/material';

import { FileCard } from '../FileCard/FileCard';
import {
  useDeleteFileMutation,
  useGetUserFilesQuery,
} from '../../api/file.api';
import { getUploadedFilesArray } from '@/shared/utils/file.utils';

export const FilesList = () => {
  const { data: filesData, isLoading, isError, error } = useGetUserFilesQuery();
  const { mutate: deleteFile } = useDeleteFileMutation();
  const handleDelete = (fileId: string) => {
    deleteFile(fileId);
  };

  const files = getUploadedFilesArray(filesData);
  let filesListContent;

  if (isLoading) {
    filesListContent = (
      <Box
        className='flex justify-center p-8'
        sx={{ display: 'flex', justifyContent: 'center', p: 4 }}
      >
        <CircularProgress />
      </Box>
    );
  } else if (isError) {
    const errorMessage =
      (error as AxiosError<any>)?.response?.data?.message ||
      (error as Error)?.message ||
      'Unknown error';
    filesListContent = (
      <Alert severity='error'>Failed to load files: {errorMessage}</Alert>
    );
  } else if (files.length === 0) {
    filesListContent = (
      <Alert severity='info'>
        You have not uploaded any files yet. Start by uploading a document.
      </Alert>
    );
  } else {
    filesListContent = (
      <Grid container spacing={3}>
        {files.map((file) => (
          <FileCard key={file.id} file={file} onDelete={handleDelete} />
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h4' component='h2' className='mt-10' gutterBottom>
        My files
      </Typography>

      {filesListContent}
    </Box>
  );
};
