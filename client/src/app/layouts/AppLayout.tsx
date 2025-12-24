import { Outlet, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { Header } from '@/widgets/Header/Header';
import { Footer } from '@/widgets/Footer/Footer';
import { APP_COLORS } from '@/shared/constants/color.constants';

export const AppLayout = () => {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isHome = location.pathname === '/';
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`overflow-hidden flex flex-col xl:container xl:mx-auto xl:px-5`}
      style={{ color: APP_COLORS['main-black'] }}
    >
      <Header isDesktop={isDesktop} onMenuClick={() => setSidebarOpen(true)} />
      {!isDesktop && (
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <main
        className={`flex justify-center overflow-y-auto`}
        style={{
          padding: isDesktop ? 'var(--space-lg)' : 'var(--space-sm)',
          minHeight: isDesktop ? 'calc(100vh - 160px)' : 'auto',
        }}
      >
        <Outlet />
      </main>
      {isHome && <Footer />}
    </div>
  );
};
