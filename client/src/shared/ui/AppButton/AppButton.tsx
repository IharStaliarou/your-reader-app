import { Button, type ButtonProps, CircularProgress } from '@mui/material';
import type { ReactNode } from 'react';

export interface IAppButtonProps extends Omit<ButtonProps, 'className'> {
  label?: string | ReactNode;
  icon?: ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  sx?: ButtonProps['sx'];
}

export const AppButton = ({
  label,
  icon,
  children,
  className,
  isLoading = false,
  loadingText = 'Loading...',
  disabled,
  sx,
  ...rest
}: IAppButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <Button disabled={isDisabled} className={className} sx={sx} {...rest}>
      {isLoading ? (
        <>
          <CircularProgress size={20} color='inherit' sx={{ mr: 1 }} />
          {loadingText}
        </>
      ) : (
        <span className='flex gap-2'>
          {icon} {label} {children}
        </span>
      )}
    </Button>
  );
};
