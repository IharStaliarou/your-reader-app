import { Button } from '@mui/material';

import { useSignOutMutation } from '@/features/auth/api/auth.api';

export const SignOutButton = () => {
  const { mutate: signOut, isPending } = useSignOutMutation();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Button
      variant='outlined'
      onClick={handleSignOut}
      disabled={isPending}
      className='text-indigo-600 border-indigo-600 hover:bg-indigo-50'
    >
      {isPending ? 'Signing out...' : 'Sign out'}
    </Button>
  );
};
