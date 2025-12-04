import LogoutIcon from '@mui/icons-material/Logout';

import {
  AppButton,
  type IAppButtonProps,
} from '@/shared/ui/AppButton/AppButton';

interface ISignOutButtonProps extends IAppButtonProps {}

export const SignOutButton = ({ ...rest }: ISignOutButtonProps) => {
  return <AppButton label='Sign out' icon={<LogoutIcon />} {...rest} />;
};
