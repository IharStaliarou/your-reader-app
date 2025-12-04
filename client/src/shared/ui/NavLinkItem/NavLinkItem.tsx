import { NavLink, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import type { INavLinkItem } from '@/shared/config/navigation.config';

interface ISidebarLinkItemProps {
  link: INavLinkItem;
  isShowIcon?: boolean;
}

export const NavLinkItem = ({
  link,
  isShowIcon = false,
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
        borderRadius: '60px',
        padding: 1,
      }}
    >
      {isShowIcon && (
        <ListItemIcon sx={{ minWidth: 40 }}>
          <link.icon />
        </ListItemIcon>
      )}
      <ListItemText primary={link.label} sx={{ color: 'var(--main-orange)' }} />
    </ListItemButton>
  );
};
