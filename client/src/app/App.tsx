import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { QueryProvider } from './providers/QueryProvider';
import { AppRoutes } from './routes/AppRoutes';
import { appTheme } from '@/shared/config/theme.config';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <QueryProvider>
          <AppRoutes />
        </QueryProvider>
      </ThemeProvider>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        aria-label='Toasts'
      />
    </BrowserRouter>
  );
}

export default App;
