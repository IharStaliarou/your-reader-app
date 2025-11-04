import { AppBar, Toolbar, Box } from '@mui/material';

import { Logo } from '@shared/ui/Logo';
import { SignOutButton } from './ui/SignOutButton/SignOutButton';
import { AuthButtons } from './ui/AuthButtons/AuthButtons';
import { useAuthStore } from '@/features/auth/store/auth.store';

export const Header = () => {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
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

        {isSignedIn ? <SignOutButton /> : <AuthButtons />}
      </Toolbar>
    </AppBar>
  );
};
