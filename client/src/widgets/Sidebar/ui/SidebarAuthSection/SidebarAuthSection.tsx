import React from 'react';
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

import { useAuth } from '@/features/auth/hooks/useAuth';

export const SidebarAuthSection: React.FC = () => {
  const { isAuthenticated, signOut, isSigningOut } = useAuth();
  const location = useLocation();

  const authLink = isAuthenticated ? '/profile' : '/login';
  const authLabel = isAuthenticated ? 'Profile' : 'Sign In';
  const isSelected = location.pathname === authLink;

  return (
    <List component='div' disablePadding>
      <li className='pt-2 border-t mt-2'>
        <NavLink to={authLink} className='w-full'>
          <ListItemButton selected={isSelected}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              {isAuthenticated ? (
                <AccountCircleIcon color='success' />
              ) : (
                <LoginIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={authLabel} />
          </ListItemButton>
        </NavLink>
      </li>

      {isAuthenticated && (
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
            onClick={signOut}
            disabled={isSigningOut}
            sx={{ mt: 1, justifyContent: 'flex-start', pl: 1.5 }}
          >
            Sign Out
          </Button>
        </div>
      )}
    </List>
  );
};
