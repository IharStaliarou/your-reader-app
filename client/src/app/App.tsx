import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { QueryProvider } from './providers/QueryProvider';
import LandingPage from '@pages/landing/LandingPage';
import VerificationPage from '@pages/verification/VerificationPage';
import AuthPage from '@pages/auth/AuthPage';
import { AuthProvider } from './providers/AuthProvider';
import { ProtectedRoute } from '@/shared/routes/ProtectedRoute';
import UploadPage from '@/pages/upload/UploadPage';

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/verify' element={<VerificationPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/upload' element={<UploadPage />} />
              {/* TODO: add profile page */}
              <Route path='/profile' element={<div>Profile page</div>} />
            </Route>
          </Routes>
        </AuthProvider>
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
