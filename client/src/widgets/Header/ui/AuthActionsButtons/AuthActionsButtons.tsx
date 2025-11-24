import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSignOutMutation } from '@/features/auth/api/auth.api';

import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { SignOutButton } from '../SignOutButton/SignOutButton';

interface IAuthActionButtonsProps {
  isSignedIn: boolean;
  isHorizontal?: boolean;
}

export const AuthActionButtons = ({
  isSignedIn,
  isHorizontal = true,
}: IAuthActionButtonsProps) => {
  const navigate = useNavigate();
  const { mutate: signOut, isPending: isSigningOut } = useSignOutMutation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (isSignedIn) {
    return <SignOutButton isSigningOut={isSigningOut} onSignOut={signOut} />;
  }

  return (
    <Box
      className={isHorizontal ? 'space-x-4' : 'flex  space-y-2'}
      sx={{ width: isHorizontal ? 'auto' : '100%' }}
    >
      <AppButton
        label='Sign in'
        variant='outlined'
        onClick={() => handleNavigate('/auth')}
        className='text-indigo-600 border-indigo-600 hover:bg-indigo-50'
        sx={{ width: isHorizontal ? 'auto' : '100%' }}
      />

      <AppButton
        label='Sign up'
        variant='contained'
        onClick={() => handleNavigate('/auth')}
        className='bg-indigo-600 hover:bg-indigo-700 shadow-md'
        sx={{ width: isHorizontal ? 'auto' : '100%' }}
      />
    </Box>
  );
};
