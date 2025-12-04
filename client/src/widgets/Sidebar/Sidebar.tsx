import { Paper } from '@mui/material';

import { SidebarAuthSection } from './ui/SidebarAuthSection/SidebarAuthSection';
import { NavPanel } from '@/shared/ui/NavPanel/NavPanel';
import { NavLinks } from '@/shared/ui/NavLinks/NavLinks';
import { Logo } from '@/shared/ui/Logo/Logo';

export const Sidebar = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        left: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 250,
        height: '100vh',
        padding: '20px',
      }}
    >
      <Logo />
      <NavPanel className='mt-4' children={<NavLinks />} />
      <SidebarAuthSection />
    </Paper>
  );
};
