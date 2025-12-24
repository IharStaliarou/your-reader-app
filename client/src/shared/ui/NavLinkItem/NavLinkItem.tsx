import { NavLink, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import type { INavLinkItem } from '@/shared/config/navigation.config';
import { APP_COLORS } from '@/shared/constants/color.constants';

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
        padding: '10px 14px',
        color: APP_COLORS['main-black'],
        transition: 'background-color 140ms ease, transform 140ms ease',
        '&.Mui-selected': {
          backgroundColor: 'rgba(31, 93, 47, 0.1)',
          color: APP_COLORS['main-green'],
        },
        '&:hover': {
          backgroundColor: 'rgba(31, 93, 47, 0.08)',
          transform: 'translateX(2px)',
        },
      }}
    >
      {isShowIcon && (
        <ListItemIcon sx={{ minWidth: 40 }}>
          <link.icon />
        </ListItemIcon>
      )}
      <ListItemText primary={link.label} sx={{ color: 'inherit' }} />
    </ListItemButton>
  );
};
