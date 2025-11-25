import { Outlet } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

import { Sidebar } from '@/widgets/Sidebar/Sidebar';
import { Header } from '@/widgets/Header/Header';

export const AppLayout = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className='container mx-auto h-screen bg-gray-50 flex flex-col'>
      {isDesktop && <Header />}
      <div className='flex flex-1 overflow-hidden'>
        {isDesktop ? null : <Sidebar />}
        <main className='flex-1 overflow-y-auto p-8'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
