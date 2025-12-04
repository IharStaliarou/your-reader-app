import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSignOutMutation } from '@/features/auth/api/auth.api';

import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { SignOutButton } from '../SignOutButton/SignOutButton';
import { APP_PATHS } from '@/shared/constants/api.constants';

interface IAuthActionButtonsProps {
  isSignedIn: boolean;
  isHorizontal?: boolean;
  className?: string;
}

export const AuthActionButtons = ({
  isSignedIn,
  isHorizontal = true,
  className,
}: IAuthActionButtonsProps) => {
  const navigate = useNavigate();
  const { mutate: signOut, isPending: isSigningOut } = useSignOutMutation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (isSignedIn) {
    return (
      <SignOutButton
        variant='outlined'
        isLoading={isSigningOut}
        onClick={() => signOut()}
      />
    );
  }

  return (
    <Box
      className={`flex ${className} ${
        isHorizontal ? ' gap-2' : 'flex-col gap-2'
      }`}
      sx={{ width: isHorizontal ? 'auto' : '100%' }}
    >
      <AppButton
        label='Sign in'
        variant='outlined'
        onClick={() => handleNavigate(APP_PATHS.AUTH.SIGN_IN)}
        isHorizontal={isHorizontal}
      />

      <AppButton
        label='Sign up'
        variant='contained'
        onClick={() => handleNavigate(APP_PATHS.AUTH.SIGN_UP)}
        className='shadow-md'
        isHorizontal={isHorizontal}
      />
    </Box>
  );
};
