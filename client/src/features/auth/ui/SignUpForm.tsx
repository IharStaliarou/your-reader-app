import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Box } from '@mui/material';

import { SignUpSchema, type ISignUpData } from '../lib/validation';
import { useSignUpMutation } from '../api/auth.api';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

interface ISignUpFormProps {
  onSuccess: () => void;
}

export const SignUpForm = ({ onSuccess }: ISignUpFormProps) => {
  const { mutate: signUpMutate, isPending } = useSignUpMutation();

  const {
    register: signUp,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpData>({
    resolver: zodResolver(SignUpSchema),
  });

  const handleFormSubmit = (data: ISignUpData) => {
    const { repeatPassword, ...userData } = data;
    signUpMutate(userData, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex flex-col gap-4 p-6 bg-white shadow-xl rounded-lg w-full max-w-md'
    >
      <Box className='flex gap-4'>
        {/* TODO: replace */}
        <TextField
          label='First name'
          variant='outlined'
          fullWidth
          {...signUp('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          label='Last name'
          variant='outlined'
          fullWidth
          {...signUp('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </Box>

      <TextField
        label='Username'
        variant='outlined'
        fullWidth
        {...signUp('userName')}
        error={!!errors.userName}
        helperText={errors.userName?.message}
      />

      <Box className='flex gap-4'>
        <TextField
          label='Email'
          variant='outlined'
          type='email'
          fullWidth
          {...signUp('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label='Phone (+375XXXXXXXXX)'
          variant='outlined'
          fullWidth
          {...signUp('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
      </Box>

      <TextField
        label='Password'
        variant='outlined'
        type='password'
        fullWidth
        {...signUp('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        label='Repeat password'
        variant='outlined'
        type='password'
        fullWidth
        {...signUp('repeatPassword')}
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
      />

      <AppButton
        label={isPending ? 'Signing up...' : 'Sign up'}
        type='submit'
        variant='contained'
        color='secondary'
        disabled={isPending}
        className='mt-2 py-3'
      />
    </Box>
  );
};
