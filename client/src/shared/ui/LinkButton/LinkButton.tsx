import { Button, type ButtonProps } from '@mui/material';
import { Link, type LinkProps } from 'react-router-dom';
import type { ElementType, ReactNode } from 'react';

export interface ILinkButtonFinalProps
  extends Omit<ButtonProps, 'component' | 'href' | 'onClick' | 'children'>,
    Pick<LinkProps, 'replace' | 'state'> {
  children?: ReactNode | string;
  to: LinkProps['to'];
  label?: string;
  startIcon?: ReactNode;
  variant?: ButtonProps['variant'];
}
// TODO: extend from AppButton for shorting props and ect
export const LinkButton = ({
  to,
  label,
  startIcon,
  children,
  variant,
  ...rest
}: ILinkButtonFinalProps) => {
  const RouterLink = Link as ElementType;

  return (
    <Button
      component={RouterLink}
      to={to}
      startIcon={startIcon}
      style={{
        padding: '8px 24px',
        border:
          variant === 'outlined' ? '1px solid var(--main-orange)' : 'none',
        borderRadius: '60px',
        background: variant === 'outlined' ? 'none' : 'var(--gradient-orange)',
        color: variant === 'outlined' ? 'var(--main-orange)' : 'white',
      }}
      {...rest}
    >
      {label || children}
    </Button>
  );
};
