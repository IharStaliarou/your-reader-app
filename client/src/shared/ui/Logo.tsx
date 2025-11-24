import { LinkButton } from './LinkButton/LinkButton';

export const Logo = () => {
  return (
    <LinkButton
      label='YOU READER'
      variant='text'
      to='/'
      className='bg-clip-text transition duration-300 tracking-wider'
    />
  );
};
