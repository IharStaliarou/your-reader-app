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
}

export const LinkButton = ({
  to,
  label,
  startIcon,
  children,
  ...rest
}: ILinkButtonFinalProps) => {
  const RouterLink = Link as ElementType;

  return (
    <Button component={RouterLink} to={to} startIcon={startIcon} {...rest}>
      {label || children}
    </Button>
  );
};
