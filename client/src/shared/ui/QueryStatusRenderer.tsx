import { AxiosError } from 'axios';
import { type ReactNode } from 'react';
import { CircularProgress, Alert, Box, Typography } from '@mui/material';

import { extractErrorMessage } from '@/shared/utils/error.utils';

interface IQueryStatusRendererProps {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  children: ReactNode;
  loadingMessage?: string;
  errorMessage?: string;
}

export const QueryStatusRenderer = ({
  isLoading,
  isError,
  error,
  children,
  loadingMessage = 'Loading content...',
  errorMessage = 'Failed to load data.',
}: IQueryStatusRendererProps) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2, alignSelf: 'center' }}>
          {loadingMessage}
        </Typography>
      </Box>
    );
  }

  if (isError) {
    const message = extractErrorMessage(error as AxiosError, errorMessage);
    return (
      <Alert severity='error'>
        {errorMessage} {message && `: ${message}`}
      </Alert>
    );
  }

  return <>{children}</>;
};
