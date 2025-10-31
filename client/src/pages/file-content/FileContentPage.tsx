import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useGetFileContentQuery } from '@/features/file/api/file.api';
import { QueryStatusRenderer } from '@/shared/ui/QueryStatusRenderer';
import { FileContentViewer } from '@/features/file/ui/FileContentViewer';

export const FileContentPage = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();

  if (!fileId) {
    return <Alert severity='error'>File ID is missing.</Alert>;
  }

  const {
    data: content,
    isLoading,
    isError,
    error,
  } = useGetFileContentQuery(fileId);

  return (
    <Box sx={{ p: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to My Files
      </Button>

      <Typography variant='h4' gutterBottom>
        📄 Viewing File Content
      </Typography>

      <QueryStatusRenderer
        isLoading={isLoading}
        isError={isError}
        error={error}
        errorMessage='Error loading file content.'
      >
        {content && <FileContentViewer content={content} />}

        {/* TODO: here should be a button "Create Bookmark" */}
      </QueryStatusRenderer>
    </Box>
  );
};
