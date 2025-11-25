import LogoutIcon from '@mui/icons-material/Logout';

import {
  AppButton,
  type IAppButtonProps,
} from '@/shared/ui/AppButton/AppButton';

interface ISignOutButtonProps extends IAppButtonProps {}

export const SignOutButton = ({ ...rest }: ISignOutButtonProps) => {
  return (
    <AppButton
      label='Sign out'
      icon={<LogoutIcon />}
      className='text-indigo-600 border-indigo-600 hover:bg-indigo-50'
      {...rest}
    />
  );
};
