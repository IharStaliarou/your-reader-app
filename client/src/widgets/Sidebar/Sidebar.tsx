import { Paper, List, Typography, Box } from '@mui/material';

import { SidebarLinkItem } from './ui/SidebarLinkItem/SidebarLinkItem';
import { SidebarAuthSection } from './ui/SidebarAuthSection/SidebarAuthSection';
import { protectedLinks, publicLinks } from './config/sidebar.config';
import { useAuthStore } from '@/features/auth/store/auth.store';

export const Sidebar = () => {
  const isAuthenticated = useAuthStore((state) => state.isSignedIn);
  const visibleLinks = [
    ...publicLinks,
    ...(isAuthenticated ? protectedLinks : []),
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        width: 250,
        height: '100vh',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography
          variant='h5'
          color='primary'
          sx={{ fontWeight: 'bold', mb: 3 }}
        >
          YOUR READER
        </Typography>
        <List component='nav'>
          {visibleLinks.map((link) => (
            <SidebarLinkItem key={link.to} link={link} />
          ))}
        </List>
      </Box>
      <SidebarAuthSection />
    </Paper>
  );
};
