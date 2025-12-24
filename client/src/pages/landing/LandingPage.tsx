import { Box } from '@mui/material';

import { useAuthStore } from '@/features/auth/store/auth.store';
import { LinkButton } from '@/shared/ui/LinkButton/LinkButton';
import { AnimationText } from './components/AnimationText/AnimationText';
import { SurfaceCard } from '@/shared/ui/SurfaceCard/SurfaceCard';
import { APP_COLORS } from '@/shared/constants/color.constants';

const LandingPage = () => {
  const { isSignedIn } = useAuthStore((state) => state);

  return (
    <Box
      className='flex flex-col'
      sx={{
        minHeight: '70vh',
      }}
    >
      <Box className='grow flex items-center justify-center p-4 sm:p-6 md:p-8 text-center'>
        <Box className='max-w-4xl w-full mx-auto'>
          <SurfaceCard
            padding='var(--space-lg)'
            sx={{ background: APP_COLORS.paper }}
          >
            <AnimationText />
            <Box
              className={`flex gap-3 sm:gap-4 md:gap-5 mt-6 md:mt-8 justify-center flex-col sm:flex-row`}
            >
              <LinkButton
                label='Upload and read'
                variant='contained'
                size='large'
                to='/upload'
              />
              {!isSignedIn && (
                <LinkButton
                  label='Sign in for save notes'
                  variant='outlined'
                  size='large'
                  to='/auth'
                />
              )}
            </Box>
          </SurfaceCard>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
