import { AxiosError } from 'axios';
import { CircularProgress, Typography, Grid, Box, Alert } from '@mui/material';

import { FileCard } from './FileCard';
import { useGetUserFilesQuery } from '../api/file.api';

// TODO: add useDeleteFileMutation
const useDeleteFileMutation = () => {
  return { mutate: (id: string) => console.log(`Deleting file: ${id}`) };
};

export const FilesList = () => {
  const { data, isLoading, isError, error } = useGetUserFilesQuery();
  const deleteMutation = useDeleteFileMutation();

  const handleDelete = (fileId: string) => {
    deleteMutation.mutate(fileId);
  };
  if (isLoading) {
    return (
      <Box
        className='flex justify-center p-8'
        sx={{ display: 'flex', justifyContent: 'center', p: 4 }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    const errorMessage =
      (error as AxiosError<any>)?.response?.data?.message ||
      (error as Error)?.message ||
      'Unknown error';
    return <Alert severity='error'>Failed to load files: {errorMessage}</Alert>;
  }

  const files = data?.files || [];

  if (files.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant='h4' gutterBottom>
          📁 My Uploaded Files
        </Typography>

        <Alert severity='info'>
          You have not uploaded any files yet. Start by uploading a document.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h4' gutterBottom>
        📁 My Uploaded Files ({files.length})
      </Typography>

      <Grid container spacing={3}>
        {files.map((file) => (
          <FileCard key={file.id} file={file} onDelete={handleDelete} />
        ))}
      </Grid>
    </Box>
  );
};
