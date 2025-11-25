import { Paper, Box } from '@mui/material';

import { SidebarAuthSection } from './ui/SidebarAuthSection/SidebarAuthSection';
import { NavPanel } from '@/shared/ui/NavPanel/NavPanel';
import { NavLinks } from '@/shared/ui/NavLinks/NavLinks';
import { Logo } from '@/shared/ui/Logo/Logo';

export const Sidebar = () => {
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
        <Logo />
        <NavPanel className='mt-4' children={<NavLinks />} />
      </Box>
      <SidebarAuthSection />
    </Paper>
  );
};
