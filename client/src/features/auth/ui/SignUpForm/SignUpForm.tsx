import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';

import { SignUpSchema, type ISignUpData } from '../../lib/validation';
import { useSignUpMutation } from '../../api/auth.api';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { ControlledTextField } from '@/shared/ui/ControlledTextField/ControlledTextField';

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
        <ControlledTextField
          register={signUp}
          label='First name'
          variant='outlined'
          fullWidth
          {...signUp('firstName')}
          errors={errors}
        />
        <ControlledTextField
          register={signUp}
          label='Last name'
          variant='outlined'
          fullWidth
          {...signUp('lastName')}
          errors={errors}
        />
      </Box>

      <ControlledTextField
        register={signUp}
        label='Username'
        variant='outlined'
        fullWidth
        {...signUp('userName')}
        errors={errors}
      />

      <Box className='flex gap-4'>
        <ControlledTextField
          register={signUp}
          label='Email'
          variant='outlined'
          type='email'
          fullWidth
          {...signUp('email')}
          errors={errors}
        />
        <ControlledTextField
          register={signUp}
          label='Phone (+375XXXXXXXXX)'
          variant='outlined'
          fullWidth
          {...signUp('phone')}
          errors={errors}
        />
      </Box>

      <ControlledTextField
        register={signUp}
        label='Password'
        variant='outlined'
        type='password'
        fullWidth
        {...signUp('password')}
        errors={errors}
      />
      <ControlledTextField
        register={signUp}
        label='Repeat password'
        variant='outlined'
        type='password'
        fullWidth
        {...signUp('repeatPassword')}
        errors={errors}
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
