import { Pagination, Box, Typography, Skeleton } from '@mui/material';
import { type ChangeEvent } from 'react';

interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  isFetching: boolean;
  onPageChange: (_event: ChangeEvent<unknown>, value: number) => void;
  showPageInfo?: boolean;
}

export const AppPagination = ({
  currentPage,
  totalPages,
  isFetching,
  onPageChange,
  showPageInfo = false,
}: AppPaginationProps) => {
  if (isFetching && totalPages === 0) {
    return (
      <Box className='my-4 flex flex-col items-center gap-2'>
        {showPageInfo && (
          <Skeleton
            variant='rounded'
            width={115}
            height={32}
            className='mb-[7px]'
          />
        )}
        <Box className='flex justify-center'>
          {[...Array(9)].map((_, index) => (
            <Skeleton
              key={index}
              variant='circular'
              width={32}
              height={32}
              className='mx-[3px]'
            />
          ))}
        </Box>
      </Box>
    );
  }
  if (totalPages <= 1) return null;

  return (
    <Box className='my-4 flex flex-col items-center gap-2'>
      {showPageInfo && (
        <Typography variant='h6' gutterBottom>
          Page {currentPage} of {totalPages}
        </Typography>
      )}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color='primary'
        disabled={isFetching}
        className='flex justify-center'
      />
    </Box>
  );
};
