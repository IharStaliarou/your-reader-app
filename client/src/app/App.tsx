import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { QueryProvider } from './providers/QueryProvider';
import LandingPage from '@pages/landing/LandingPage';
import VerificationPage from '@pages/verification/VerificationPage';
import AuthPage from '@pages/auth/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/verify' element={<VerificationPage />} />
        </Routes>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
