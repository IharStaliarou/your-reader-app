import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { QueryProvider } from './providers/QueryProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AppRoutes />
      </QueryProvider>
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
