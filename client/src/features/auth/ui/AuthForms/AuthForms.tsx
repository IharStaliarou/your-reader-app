import { SignInForm } from '../SignInForm/SignInForm';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import type { AuthMode } from '../TabSwitcher/TabSwitcher';

interface IAuthFormsProps {
  mode: AuthMode;
  onSignUpSuccess: () => void;
}

export const AuthForms = ({ mode, onSignUpSuccess }: IAuthFormsProps) => {
  return mode === 'sign-in' ? (
    <SignInForm />
  ) : (
    <SignUpForm onSuccess={onSignUpSuccess} />
  );
};
