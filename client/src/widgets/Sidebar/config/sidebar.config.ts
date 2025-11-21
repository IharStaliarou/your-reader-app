import type { ElementType } from 'react';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SettingsIcon from '@mui/icons-material/Settings';

export interface ISidebarLink {
  to: string;
  icon: ElementType;
  label: string;
}

export const publicLinks: ISidebarLink[] = [
  { to: '/files', icon: FolderSharedIcon, label: 'My Files' }, // TODO: create dropdown for list of files
];

export const protectedLinks: ISidebarLink[] = [
  { to: '/profile/settings', icon: SettingsIcon, label: 'Settings' },
];
