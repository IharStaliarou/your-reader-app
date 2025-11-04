import { NavLink, useLocation } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  CircularProgress,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useSignOutMutation } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/features/auth/store/auth.store';

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
          <Button
            fullWidth
            variant='text'
            color='error'
            startIcon={
              isSigningOut ? (
                <CircularProgress size={20} color='inherit' />
              ) : (
                <LogoutIcon />
              )
            }
            onClick={() => signOut()}
            disabled={isSigningOut}
            sx={{ mt: 1, justifyContent: 'flex-start', pl: 1.5 }}
          >
            {isSigningOut ? 'Signing out...' : 'Sign Out'}
          </Button>
        </div>
      )}
    </List>
  );
};
