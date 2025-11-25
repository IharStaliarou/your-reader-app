import { TextField, type TextFieldProps } from '@mui/material';

export const CommonTextField = (props: TextFieldProps) => {
  return <TextField variant='outlined' fullWidth margin='dense' {...props} />;
};
