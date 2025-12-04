import { Outlet, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { Header } from '@/widgets/Header/Header';
import { Footer } from '@/widgets/Footer/Footer';

export const AppLayout = () => {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isHome = location.pathname === '/';

  return (
    <div
      className={`overflow-hidden mx-5 flex flex-col xl:container xl:mx-auto xl:px-5 ${
        isDesktop && 'my-5'
      } `}
    >
      {isDesktop && <Header />}
      {isDesktop ? null : <Sidebar />}
      <main
        className={`flex justify-center overflow-y-auto p-8 ${
          isDesktop && 'h-screen'
        }`}
      >
        <Outlet />
      </main>
      {isHome && <Footer />}
    </div>
  );
};
