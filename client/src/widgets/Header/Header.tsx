import { AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Logo } from '@/shared/ui/Logo/Logo';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { AuthActionButtons } from '../../shared/ui/AuthActionsButtons/AuthActionsButtons';
import { NavLinks } from '../../shared/ui/NavLinks/NavLinks';
import { NavPanel } from '../../shared/ui/NavPanel/NavPanel';
import { APP_COLORS } from '@/shared/constants/color.constants';

interface IHeaderProps {
  isDesktop: boolean;
  onMenuClick: () => void;
}

export const Header = ({ isDesktop, onMenuClick }: IHeaderProps) => {
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
        borderRadius: 'var(--radius-lg)',
        padding: {
          xs: 'var(--space-sm)',
          sm: 'var(--space-md)',
          md: '18px 28px',
        },
        bgcolor: APP_COLORS.paper,
        color: APP_COLORS['main-black'],
        border: `1px solid rgba(27, 23, 22, 0.08)`,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Logo />

      {isDesktop ? (
        <>
          <NavPanel className='flex w-auto sx:hidden' children={<NavLinks />} />
          <AuthActionButtons isSignedIn={isSignedIn} isHorizontal={true} />
        </>
      ) : (
        <IconButton
          edge='end'
          onClick={onMenuClick}
          aria-label='open menu'
          sx={{ ml: 'auto', color: APP_COLORS['main-black'] }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </AppBar>
  );
};
