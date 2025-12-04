import { Button, type ButtonProps, CircularProgress } from '@mui/material';
import type { ReactNode } from 'react';

export interface IAppButtonProps extends Omit<ButtonProps, 'className'> {
  label?: string | ReactNode;
  icon?: ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  sx?: ButtonProps['sx'];
  isHorizontal?: boolean;
}

export const AppButton = ({
  label,
  icon,
  children,
  className,
  isLoading = false,
  isHorizontal = true,
  loadingText = 'Loading...',
  disabled,
  variant,
  sx,
  ...rest
}: IAppButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <Button
      disabled={isDisabled}
      className={`h-[42px] ${className}`}
      sx={{
        ...sx,
        width: isHorizontal ? 'auto' : '100%',
        borderRadius: '60px',
        textAlign: 'center',
        padding: '8px 24px',
        background: variant === 'outlined' ? 'none' : 'var(--gradient-orange)',
        color: variant === 'outlined' ? 'var(--main-orange)' : 'white',
        border:
          variant === 'outlined' ? '1px solid var(--main-orange)' : 'none',
      }}
      {...rest}
    >
      {isLoading && (
        <CircularProgress size={20} color='inherit' className='mr-2' />
      )}
      <span className='flex gap-2'>
        {icon} {label} {children}
      </span>
    </Button>
  );
};
