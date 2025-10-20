import { useState, useEffect } from 'react';
import { Typography, type TypographyProps } from '@mui/material';

interface TypewriterTextProps extends TypographyProps {
  text: string;
  delay?: number;
  initialDelay?: number;
  onAnimationEnd?: () => void;
}

export const TypewriterText = ({
  text,
  delay = 50,
  initialDelay = 0,
  onAnimationEnd,
  ...typographyProps
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const charTimer = setInterval(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, delay);

        return () => clearInterval(charTimer);
      } else {
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, [text, delay, initialDelay, currentIndex, onAnimationEnd]);

  useEffect(() => {
    setDisplayedText(text.substring(0, currentIndex));
  }, [currentIndex, text]);

  return (
    <Typography {...typographyProps}>
      {displayedText}
      {currentIndex < text.length && <span className='animate-blink'>|</span>}
    </Typography>
  );
};
