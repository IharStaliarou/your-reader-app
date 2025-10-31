import { NavLink, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import type { ISidebarLink } from '../../config/sidebar.config';

interface ISidebarLinkItemProps {
  link: ISidebarLink;
}

export const SidebarLinkItem = ({ link }: ISidebarLinkItemProps) => {
  const location = useLocation();
  const isSelected = location.pathname === link.to;

  return (
    <ListItemButton
      key={link.to}
      component={NavLink}
      to={link.to}
      selected={isSelected}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <link.icon color={isSelected ? 'primary' : 'inherit'} />
      </ListItemIcon>
      <ListItemText primary={link.label} /> 
    </ListItemButton>
  );
};
