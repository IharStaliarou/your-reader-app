import { Drawer, Paper, useMediaQuery, useTheme } from '@mui/material';

import { SidebarAuthSection } from './ui/SidebarAuthSection/SidebarAuthSection';
import { NavPanel } from '@/shared/ui/NavPanel/NavPanel';
import { NavLinks } from '@/shared/ui/NavLinks/NavLinks';
import { Logo } from '@/shared/ui/Logo/Logo';
import { APP_COLORS } from '@/shared/constants/color.constants';

interface ISidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ open = false, onClose }: ISidebarProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const content = (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: { xs: 280, sm: 320, md: 250 },
        height: { xs: '100%', md: '100vh' },
        padding: 'var(--space-md)',
        backgroundColor: APP_COLORS.paper,
        borderRadius: { xs: 0, md: 'var(--radius-lg)' },
        border: `1px solid rgba(27, 23, 22, 0.08)`,
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
        gap: 'var(--space-md)',
      }}
    >
      <Logo />
      <NavPanel className='mt-2' children={<NavLinks />} />
      <SidebarAuthSection />
    </Paper>
  );

  if (isDesktop) {
    return (
      <div style={{ position: 'absolute', left: 0, zIndex: 100 }}>
        {content}
      </div>
    );
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor='left'
      PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none' } }}
    >
      {content}
    </Drawer>
  );
};
