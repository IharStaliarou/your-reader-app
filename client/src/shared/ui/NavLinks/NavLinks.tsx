import { protectedLinks, publicLinks } from '@/shared/config/navigation.config';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { NavLinkItem } from '../NavLinkItem/NavLinkItem';

export const NavLinks = () => {
  const isAuthenticated = useAuthStore((state) => state.isSignedIn);
  const visibleLinks = [
    ...publicLinks,
    ...(isAuthenticated ? protectedLinks : []),
  ];

  return (
    <>
      {visibleLinks.map((link) => (
        <NavLinkItem key={link.to} link={link} isHorizontal={true} />
      ))}
    </>
  );
};
