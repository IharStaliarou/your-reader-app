import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { Header } from '@/widgets/Header/Header';
import { TypewriterText } from '@shared/ui/TypewriterText';

const LandingPage = () => {
  const navigate = useNavigate();
  const [titleAnimationFinished, setTitleAnimationFinished] = useState(false);
  const [descriptionAnimationFinished, setDescriptionAnimationFinished] =
    useState(false);
  const handleTitleAnimationEnd = () => {
    setTitleAnimationFinished(true);
  };

  const handleDescriptionAnimationEnd = () => {
    setDescriptionAnimationFinished(true);
  };

  return (
    <Box className='min-h-screen flex flex-col bg-gray-50'>
      <Header />

      <Box className='flex-grow flex items-center justify-center p-8 text-center'>
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
            <Button
              variant='contained'
              size='large'
              onClick={() => navigate('/upload')}
              className='bg-green-600 hover:bg-green-700 py-3 px-8 text-lg shadow-xl mr-4'
            >
              Upload and read
            </Button>
            <Button
              variant='outlined'
              size='large'
              onClick={() => navigate('/auth')}
              className='text-indigo-600 border-indigo-600 hover:bg-indigo-50 py-3 px-8 text-lg'
            >
              Sign in for save notes
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className='p-4 text-center text-gray-500 text-sm border-t border-gray-100'>
        © 2025 YOUR READER. All rights reserved.
      </Box>
    </Box>
  );
};

export default LandingPage;
