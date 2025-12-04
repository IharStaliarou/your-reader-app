import { TypewriterText } from '@/shared/ui/TypewriterText/TypewriterText';
import { Box } from '@mui/material';
import { useState } from 'react';

export const AnimationText = () => {
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
    <Box className='flex flex-col gap-5'>
      <TypewriterText
        text='Save what matters most. Manage your notes.'
        variant='h2'
        component='h1'
        delay={50}
        className='text-5xl font-extrabold text-emerald-900 leading-tight'
        onAnimationEnd={handleTitleAnimationEnd}
      />

      {titleAnimationFinished && (
        <TypewriterText
          text='Upload PDFs or text files, easily highlight, save, and catalog your favorite sections for quick access.'
          variant='h5'
          component='p'
          delay={30}
          initialDelay={500}
          className='text-xl text-gray-50'
          onAnimationEnd={handleDescriptionAnimationEnd}
        />
      )}
    </Box>
  );
};
