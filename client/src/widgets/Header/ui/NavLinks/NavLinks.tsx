import { SidebarLinkItem } from '@/widgets/Sidebar/ui/SidebarLinkItem/SidebarLinkItem';
import {
  protectedLinks,
  publicLinks,
} from '@/widgets/Sidebar/config/sidebar.config';
import { useAuthStore } from '@/features/auth/store/auth.store';

export const NavLinks = () => {
  const isAuthenticated = useAuthStore((state) => state.isSignedIn);
  const visibleLinks = [
    ...publicLinks,
    ...(isAuthenticated ? protectedLinks : []),
  ];

  return (
    <>
      {visibleLinks.map((link) => (
        <SidebarLinkItem key={link.to} link={link} isHorizontal={true} />
      ))}
    </>
  );
};
