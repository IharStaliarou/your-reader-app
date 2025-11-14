import { useState, useEffect } from 'react';
import { Typography, type TypographyProps } from '@mui/material';

interface ITypewriterTextProps extends TypographyProps {
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
}: ITypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let initialTimer: ReturnType<typeof setTimeout>;
    let charTimer: ReturnType<typeof setInterval>;

    initialTimer = setTimeout(() => {
      charTimer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          if (nextIndex > text.length) {
            clearInterval(charTimer);
            if (onAnimationEnd) {
              onAnimationEnd();
            }
            return prevIndex;
          }

          return nextIndex;
        });
      }, delay);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(charTimer);
    };
  }, [text, delay, initialDelay, onAnimationEnd]);

  useEffect(() => {
    setDisplayedText(text.substring(0, currentIndex));
  }, [currentIndex, text]);

  return (
    <Typography {...typographyProps}>
      {displayedText}
      {currentIndex <= text.length && <span className='animate-blink'>|</span>}
    </Typography>
  );
};
