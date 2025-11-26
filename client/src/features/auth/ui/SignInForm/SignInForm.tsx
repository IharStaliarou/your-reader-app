import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SignInSchema, type ISignInData } from '../../lib/validation';
import { useSignInMutation } from '../../api/auth.api';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { ControlledTextField } from '@/shared/ui/ControlledTextField/ControlledTextField';
import { APP_PATHS } from '@/shared/constants/api.constants';

export const SignInForm = () => {
  const navigate = useNavigate();
  const { mutate: signInMutate, isPending } = useSignInMutation();

  const {
    register: signIn,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>({
    resolver: zodResolver(SignInSchema),
  });

  const handleFormSubmit = (data: ISignInData) => {
    signInMutate(data, {
      onSuccess: () => {
        navigate(APP_PATHS.PROFILE);
      },
    });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex flex-col gap-4 p-6 bg-white shadow-xl rounded-lg w-full max-w-sm'
    >
      <ControlledTextField
        register={signIn}
        label='Username'
        variant='outlined'
        fullWidth
        {...signIn('userName')}
        errors={errors}
      />

      <ControlledTextField
        register={signIn}
        label='Password'
        variant='outlined'
        type='password'
        fullWidth
        {...signIn('password')}
        errors={errors}
      />

      <AppButton
        label={isPending ? 'Signing in...' : 'Sign in'}
        isLoading={isPending}
        type='submit'
        variant='contained'
        color='primary'
        disabled={isPending}
        className='mt-2 py-3'
      />
    </Box>
  );
};
