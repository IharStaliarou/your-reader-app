import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useVerifyMutation } from '@/features/auth/api/auth.api';

const VerificationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, data, isError, error } =
    useVerifyMutation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      mutate(token);
    } else {
      navigate('/auth', {
        replace: true,
        state: { message: 'Verification token not found' },
      });
    }
  }, [location.search, mutate, navigate]);

  const displayMessage = () => {
    if (isPending) {
      return (
        <>
          <CircularProgress className='mb-4' />
          <Typography variant='h5'>Checking your token ...</Typography>
        </>
      );
    }

    if (isSuccess) {
      return (
        <>
          <Typography variant='h4' color='primary' className='mb-4'>
            🎉 Success!
          </Typography>
          <Typography variant='body1'>{data?.message}</Typography>
          <Button
            onClick={() => navigate('/auth')}
            variant='contained'
            className='mt-6 bg-indigo-600 hover:bg-indigo-700'
          >
            Sign in now
          </Button>
        </>
      );
    }

    if (isError) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        'Invalid or expired link. Please try again.';
      return (
        <>
          <Typography variant='h4' color='error' className='mb-4'>
            🚫 Error!
          </Typography>
          <Typography variant='body1'>{errorMessage}</Typography>
          <Button
            onClick={() => navigate('/')}
            variant='outlined'
            className='mt-6 text-indigo-600 border-indigo-600'
          >
            Back to main page
          </Button>
        </>
      );
    }

    return null;
  };

  return (
    <Box className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Box className='p-8 bg-white shadow-lg rounded-lg text-center max-w-sm'>
        {displayMessage()}
      </Box>
    </Box>
  );
};

export default VerificationPage;
