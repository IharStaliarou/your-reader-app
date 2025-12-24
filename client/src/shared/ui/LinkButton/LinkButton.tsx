import { Link, type LinkProps } from 'react-router-dom';
import type { ElementType, ReactNode } from 'react';
import { AppButton, type IAppButtonProps } from '../AppButton/AppButton';

export interface ILinkButtonFinalProps
  extends Omit<IAppButtonProps, 'component' | 'href' | 'onClick'>,
    Pick<LinkProps, 'replace' | 'state'> {
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
    <AppButton component={RouterLink} to={to} startIcon={startIcon} {...rest}>
      {label || children}
    </AppButton>
  );
};
