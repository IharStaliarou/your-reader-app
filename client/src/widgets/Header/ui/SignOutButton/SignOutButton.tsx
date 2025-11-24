import LogoutIcon from '@mui/icons-material/Logout';

import {
  AppButton,
  type IAppButtonProps,
} from '@/shared/ui/AppButton/AppButton';

interface ISignOutButtonProps extends IAppButtonProps {
  isSigningOut: boolean;
  onSignOut: () => void;
}

export const SignOutButton = ({
  isSigningOut,
  onSignOut,
  ...rest
}: ISignOutButtonProps) => {
  return (
    <AppButton
      label='Sign out'
      icon={<LogoutIcon />}
      variant='outlined'
      onClick={onSignOut}
      className='text-indigo-600 border-indigo-600 hover:bg-indigo-50'
      disabled={isSigningOut}
      isLoading={isSigningOut}
      {...rest}
    />
  );
};
