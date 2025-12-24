import { Button, type ButtonProps, CircularProgress } from '@mui/material';
import type { ElementType, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { APP_COLORS } from '@/shared/constants/color.constants';

export interface IAppButtonProps extends Omit<ButtonProps, 'className'> {
  label?: string | ReactNode;
  icon?: ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  sx?: ButtonProps['sx'];
  isHorizontal?: boolean;
  to?: LinkProps['to'];
  replace?: LinkProps['replace'];
  state?: LinkProps['state'];
  component?: ElementType;
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
  to,
  replace,
  state,
  component,
  ...rest
}: IAppButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <Button
      disabled={isDisabled}
      className={`min-h-10 ${className}`}
      component={to ? Link : 'button'}
      to={to}
      replace={replace}
      state={state}
      sx={{
        ...sx,
        width: isHorizontal ? { xs: '100%', sm: 'auto' } : '100%',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
        padding: { xs: '10px 14px', sm: '10px 20px', md: '12px 24px' },
        background:
          variant === 'outlined' ? 'transparent' : APP_COLORS['main-green'],
        color:
          variant === 'outlined'
            ? APP_COLORS['main-green']
            : APP_COLORS['main-white'],
        border:
          variant === 'outlined'
            ? `1px solid ${APP_COLORS['main-green']}`
            : 'none',
        boxShadow:
          variant === 'contained'
            ? '0 10px 30px rgba(31, 93, 47, 0.15)'
            : 'none',
        transition:
          'transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease',
        '&:hover': {
          transform: isDisabled ? 'none' : 'translateY(-1px)',
          boxShadow:
            variant === 'contained'
              ? '0 14px 36px rgba(31, 93, 47, 0.2)'
              : '0 10px 26px rgba(27, 23, 22, 0.08)',
          background:
            variant === 'outlined'
              ? 'rgba(31, 93, 47, 0.08)'
              : APP_COLORS['main-green'],
        },
        '&:active': {
          transform: 'translateY(0)',
        },
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
