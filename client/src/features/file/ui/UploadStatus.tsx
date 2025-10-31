import { AxiosError } from 'axios';
import { Alert, AlertTitle } from '@mui/material';

import { extractErrorMessage } from '@/shared/utils/error.utils';

interface IUploadStatusProps {
  isSuccess: boolean;
  isError: boolean;
  error: unknown;
  fileName: string | null;
}

export const UploadStatus = ({
  isSuccess,
  isError,
  error,
  fileName,
}: IUploadStatusProps) => {
  if (isSuccess) {
    return (
      <Alert severity='success' className='mt-4'>
        <AlertTitle>Success</AlertTitle> File **{fileName}** uploaded
        successfully!
      </Alert>
    );
  }

  if (isError) {
    const axiosError = error as AxiosError<any>;
    const message = extractErrorMessage(
      axiosError,
      'An unexpected error occurred during upload.'
    );
    return (
      <Alert severity='error' className='mt-4'>
        <AlertTitle>Upload Failed</AlertTitle> {message}
      </Alert>
    );
  }

  return null;
};
