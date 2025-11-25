import { TextField, type TextFieldProps } from '@mui/material';
import type {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';

interface ControlledTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'name' | 'error' | 'helperText'> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export const ControlledTextField = <T extends FieldValues>({
  name,
  register,
  errors,
  ...props
}: ControlledTextFieldProps<T>) => {
  const fieldError = errors[name];

  return (
    <TextField
      variant='outlined'
      fullWidth
      {...register(name)}
      error={!!fieldError}
      helperText={fieldError?.message as string | undefined}
      {...props}
    />
  );
};
