import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box } from '@mui/material';

import { SignInSchema, type ISignInData } from '../lib/validation';
import { useSignInMutation } from '../api/auth.api';
import { useAuth } from '@/app/providers/AuthProvider';

export const SignInForm = () => {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const { mutate: signInMutate, isPending } = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInData>({
    resolver: zodResolver(SignInSchema),
  });

  const handleFormSubmit = (data: ISignInData) => {
    signInMutate(data, {
      onSuccess: () => {
        signIn();
      },
    });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex flex-col gap-4 p-6 bg-white shadow-xl rounded-lg w-full max-w-sm'
    >
      <TextField
        label='Username'
        variant='outlined'
        fullWidth
        {...register('userName')}
        error={!!errors.userName}
        helperText={errors.userName?.message}
      />

      <TextField
        label='Password'
        variant='outlined'
        type='password'
        fullWidth
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={isPending}
        className='mt-2 py-3'
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </Box>
  );
};
