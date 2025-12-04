import { useAuthStore } from '@/features/auth/store/auth.store';
import { AuthActionButtons } from '@/shared/ui/AuthActionsButtons/AuthActionsButtons';
import { Box, Divider } from '@mui/material';

export const SidebarAuthSection = () => {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);

  return (
    <Box className='flex flex-col gap-4'>
      <Divider />
      <AuthActionButtons isSignedIn={isSignedIn} isHorizontal={false} />
    </Box>
  );
};
