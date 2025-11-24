import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { TypewriterText } from '@shared/ui/TypewriterText';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { Footer } from '@/widgets/Footer/Footer';
import { LinkButton } from '@/shared/ui/LinkButton/LinkButton';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuthStore((state) => state);
  const [titleAnimationFinished, setTitleAnimationFinished] = useState(false);
  const [_descriptionAnimationFinished, setDescriptionAnimationFinished] =
    useState(false);
  const handleTitleAnimationEnd = () => {
    setTitleAnimationFinished(true);
  };

  const handleDescriptionAnimationEnd = () => {
    setDescriptionAnimationFinished(true);
  };

  return (
    <Box className='min-h-screen flex flex-col bg-gray-50'>
      <Box className='grow flex items-center justify-center p-8 text-center'>
        <Box className='max-w-4xl mx-auto'>
          <TypewriterText
            text='Save what matters most. Manage your notes.'
            variant='h2'
            component='h1'
            gutterBottom
            delay={50}
            className='text-5xl font-extrabold text-gray-900 leading-tight mb-4'
            onAnimationEnd={handleTitleAnimationEnd}
          />

          {titleAnimationFinished && (
            <TypewriterText
              text='Upload PDFs or text files, easily highlight, save, and catalog your favorite sections for quick access.'
              variant='h5'
              component='p'
              delay={30}
              initialDelay={500}
              className='text-xl text-gray-600 mb-8'
              onAnimationEnd={handleDescriptionAnimationEnd}
            />
          )}

          <Box
            className={`transition-opacity duration-1000 opacity-100'
            }`}
          >
            <LinkButton
              label='Upload and read'
              variant='contained'
              size='large'
              to='/upload'
              className='bg-green-600 hover:bg-green-700 py-3 px-8 text-lg shadow-xl mr-4'
            />
            {!isSignedIn && (
              <AppButton
                label='Sign in for save notes'
                variant='outlined'
                size='large'
                onClick={() => navigate('/auth')}
                className='text-indigo-600 border-indigo-600 hover:bg-indigo-50 py-3 px-8 text-lg'
              />
            )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
