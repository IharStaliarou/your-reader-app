import type { ReactNode } from 'react';

interface INavPanelProps {
  children: ReactNode[] | ReactNode;
}

export const NavPanel = ({ children }: INavPanelProps) => {
  return <div className='flex w-auto sx:hidden'>{children}</div>;
};
