import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AuthButtons = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box className='space-x-4'>
      <Button
        variant='outlined'
        onClick={() => handleNavigate('/auth')}
        className='text-indigo-600 border-indigo-600 hover:bg-indigo-50'
      >
        Sign in
      </Button>

      <Button
        variant='contained'
        onClick={() => handleNavigate('/auth')}
        className='bg-indigo-600 hover:bg-indigo-700 shadow-md'
      >
        Sign up
      </Button>
    </Box>
  );
};
