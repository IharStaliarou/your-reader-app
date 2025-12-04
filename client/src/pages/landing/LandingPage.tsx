import { Box } from '@mui/material';

import { useAuthStore } from '@/features/auth/store/auth.store';
import { LinkButton } from '@/shared/ui/LinkButton/LinkButton';
import { AnimationText } from './components/AnimationText/AnimationText';

const LandingPage = () => {
  const { isSignedIn } = useAuthStore((state) => state);

  return (
    <Box className=' flex flex-col '>
      <Box className='grow flex items-center justify-center p-8 text-center'>
        <Box className='max-w-4xl mx-auto'>
          <Box>
            <AnimationText />
            <Box className={`flex gap-5 mt-8 justify-center`}>
              <LinkButton
                label='Upload and read'
                variant='contained'
                size='large'
                to='/upload'
                className='shadow-xl'
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
