import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { QueryProvider } from './providers/QueryProvider';
import LandingPage from '@pages/landing/LandingPage';
import VerificationPage from '@pages/verification/VerificationPage';
import AuthPage from '@pages/auth/AuthPage';
import { useUserProfileQuery } from '@/features/auth/api/user.api';
import AuthStatusProvider from './providers/AuthStatusProvider';

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthStatusProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/verify' element={<VerificationPage />} />
            {/* TODO: remove test code */}
            <Route path='/profile' element={<TestProfileDisplay />} />
          </Routes>
        </AuthStatusProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;

// TODO: remove test code
const TestProfileDisplay: React.FC = () => {
  const { data, isLoading, isError, error } = useUserProfileQuery();

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (isError) {
    return (
      <p style={{ color: 'red' }}>Ошибка загрузки профиля: {error.message}</p>
    );
  }

  return (
    <div style={{ padding: '20px', border: '1px solid green', margin: '20px' }}>
      <h2>User is authenticated</h2>
      <p>Status: {data?.message || 'OK'}</p>
      <p>Username: {data?.userName}</p>
      <p>Email: {data?.email}</p>
      <p>Check Network in devTools for interceptor details working</p>
    </div>
  );
};
