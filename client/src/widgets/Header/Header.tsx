import { AppBar, Toolbar } from '@mui/material';

import { Logo } from '@/shared/ui/Logo/Logo';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { AuthActionButtons } from '../../shared/ui/AuthActionsButtons/AuthActionsButtons';
import { NavLinks } from '../../shared/ui/NavLinks/NavLinks';
import { NavPanel } from '../../shared/ui/NavPanel/NavPanel';

export const Header = () => {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  return (
    <AppBar
      position='static'
      color='transparent'
      elevation={0}
      className='border-b border-gray-200'
    >
      <Toolbar className='flex justify-between'>
        <Logo />
        <NavPanel className='flex w-auto sx:hidden' children={<NavLinks />} />
        <AuthActionButtons isSignedIn={isSignedIn} isHorizontal={true} />
      </Toolbar>
    </AppBar>
  );
};
