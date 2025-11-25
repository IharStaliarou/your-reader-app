import { NavLink, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import type { INavLinkItem } from '@/shared/config/navigation.config';

interface ISidebarLinkItemProps {
  link: INavLinkItem;
  isHorizontal?: boolean;
}

export const NavLinkItem = ({
  link,
  isHorizontal = false,
}: ISidebarLinkItemProps) => {
  const location = useLocation();
  const isSelected =
    location.pathname === link.to || location.pathname.includes(link.to);

  return (
    <ListItemButton
      key={link.to}
      component={NavLink}
      to={link.to}
      selected={isSelected}
      sx={{
        py: isHorizontal ? 0.5 : 1,
        px: isHorizontal ? 1 : 2,
        mr: isHorizontal ? 1 : 0,
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <link.icon color={isSelected ? 'primary' : 'inherit'} />
      </ListItemIcon>
      <ListItemText primary={link.label} /> 
    </ListItemButton>
  );
};
