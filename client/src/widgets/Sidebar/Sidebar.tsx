import { Paper, List, Typography } from '@mui/material';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { SidebarLinkItem } from './ui/SidebarLinkItem/SidebarLinkItem';
import { SidebarAuthSection } from './ui/SidebarAuthSection/SidebarAuthSection';
import { protectedLinks, publicLinks } from './config/sidebar.config';

export const Sidebar = () => {
  const { isAuthenticated } = useAuth();

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
      <div>
        <Typography
          variant='h5'
          color='primary'
          sx={{ fontWeight: 'bold', mb: 3 }}
        >
          File Analyzer
        </Typography>
        <List component='nav'>
          {visibleLinks.map((link) => (
            <SidebarLinkItem key={link.to} link={link} />
          ))}
        </List>
      </div>
      <SidebarAuthSection />
    </Paper>
  );
};
