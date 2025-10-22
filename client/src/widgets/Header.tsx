import { Button, AppBar, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Logo } from '@shared/ui/Logo';
import { useSignOutMutation } from '@/features/auth/api/auth.api';
import { useAuth } from '@/app/providers/AuthProvider';

export const Header = () => {
  const navigate = useNavigate();

  const { isSignedIn, signOut } = useAuth();

  // TODO: fix - hidden SignOut btn after sign out
  const signOutMutation = useSignOutMutation(navigate);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar
      position='static'
      color='transparent'
      elevation={0}
      className='border-b border-gray-200'
    >
      <Toolbar className='max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8'>
        <Logo />

        <Box sx={{ flexGrow: 1 }} />

        {isSignedIn ? (
          <Button
            variant='outlined'
            onClick={() => signOutMutation.mutate()}
            disabled={signOutMutation.isPending}
            className='text-indigo-600 border-indigo-600 hover:bg-indigo-50'
          >
            {signOutMutation.isPending ? 'Signing out...' : 'Sign out'}
          </Button>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
};
