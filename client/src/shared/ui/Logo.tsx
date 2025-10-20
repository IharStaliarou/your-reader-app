import { Typography } from '@mui/material';

export const Logo = () => {
  return (
    <Typography
      variant='h6'
      noWrap
      component='a'
      href='/'
      className='text-2xl font-extrabold text-indigo-600 hover:text-indigo-800 transition duration-300 tracking-wider'
    >
      YOUR READER
    </Typography>
  );
};
