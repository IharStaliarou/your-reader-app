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
      elevation={1}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 60,
        padding: '20px 30px',
        bgcolor: 'white',
      }}
    >
      <Logo />
      <NavPanel className='flex w-auto sx:hidden' children={<NavLinks />} />
      <AuthActionButtons isSignedIn={isSignedIn} isHorizontal={true} />
    </AppBar>
  );
};
