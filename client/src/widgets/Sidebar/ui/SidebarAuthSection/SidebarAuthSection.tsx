import { NavLink, useLocation } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useAuthStore } from '@/features/auth/store/auth.store';
import { useSignOutMutation } from '@/features/auth/api/auth.api';
import { AuthActionButtons } from '@/shared/ui/AuthActionsButtons/AuthActionsButtons';
import { SignOutButton } from '@/shared/ui/SignOutButton/SignOutButton';

export const SidebarAuthSection = () => {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const isSigningOut = useAuthStore((state) => state.isSigningOut);
  const { mutate: signOut } = useSignOutMutation();

  const location = useLocation();

  const authLink = isSignedIn ? '/profile' : '/auth';
  const authLabel = isSignedIn ? 'Profile' : 'Sign In';
  const isSelected = location.pathname === authLink;

  return (
    <List component='div' disablePadding>
      <li className='pt-2 border-t mt-2'>
        <NavLink to={authLink} className='w-full'>
          <ListItemButton selected={isSelected}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              {isSignedIn ? (
                <AccountCircleIcon color='success' />
              ) : (
                <LoginIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={authLabel} />
          </ListItemButton>
        </NavLink>
      </li>

      {isSignedIn && (
        <div className='pt-4 border-t'>
          <SignOutButton
            variant='outlined'
            isLoading={isSigningOut}
            onClick={() => signOut()}
          />
        </div>
      )}
      {!isSignedIn && (
        <AuthActionButtons isSignedIn={false} isHorizontal={false} />
      )}
    </List>
  );
};
