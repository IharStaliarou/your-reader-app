import { List } from '@mui/material';
import type { ReactNode } from 'react';

interface INavPanelProps {
  children: ReactNode[] | ReactNode;
  className?: string;
}

export const NavPanel = ({ children, className }: INavPanelProps) => {
  return (
    <List component='nav' className={className}>
      {children}
    </List>
  );
};
