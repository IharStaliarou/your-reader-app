import {
  AUTH_TYPES,
  type AuthModeType,
} from '@/shared/constants/api.constants';
import { SignInForm } from '../SignInForm/SignInForm';
import { SignUpForm } from '../SignUpForm/SignUpForm';

interface IAuthFormsProps {
  mode: AuthModeType;
  onSignUpSuccess: () => void;
  className?: string;
}

export const AuthForms = ({
  mode,
  onSignUpSuccess,
  className,
}: IAuthFormsProps) => {
  return mode === AUTH_TYPES.SIGN_IN ? (
    <SignInForm className={className} />
  ) : (
    <SignUpForm className={className} onSuccess={onSignUpSuccess} />
  );
};
