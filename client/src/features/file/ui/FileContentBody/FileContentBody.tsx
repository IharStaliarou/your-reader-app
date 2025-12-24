import { Box, Typography } from '@mui/material';

import { useGetFileBookmarksQuery } from '@/features/bookmark/api/bookmark.api';
import { BookmarksList } from '@/features/bookmark/ui/BookmarksList/BookmarksList';
import { useFilePagination } from '../../hooks/useFilePagination';
import { FileContentViewer } from '../../ui/FileContentViewer/FileContentViewer';
import { useGetUserFilesQuery } from '../../api/file.api';
import { AppPagination } from '@/shared/ui/AppPagination/AppPagination';
import { getCurrentFile, getFileTitle } from '@/shared/utils/file.utils';

interface IFileContentBodyProps {
  fileId: string;
}

export const FileContentBody = ({ fileId }: IFileContentBodyProps) => {
  useGetFileBookmarksQuery();
  const { data: filesData } = useGetUserFilesQuery();
  const currentFile = getCurrentFile(filesData, fileId);

  const {
    currentPage,
    totalPages,
    isFetching,
    pageData,
    globalCharOffset,
    handlePageChange,
    handleScrollToCharReady,
    handleScrollToBookmark,
  } = useFilePagination(fileId);

  return (
    <Box className='flex flex-col gap-4 sm:gap-6'>
      <Typography variant='h4' sx={{ fontSize: { xs: '22px', md: '28px' } }}>
        {getFileTitle(currentFile)}
      </Typography>

      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        isFetching={isFetching}
        onPageChange={handlePageChange}
        showPageInfo={true}
      />

      <Box
        className='flex gap-4 sm:gap-6 flex-col lg:flex-row'
        sx={{ alignItems: { xs: 'stretch', lg: 'flex-start' } }}
      >
        <FileContentViewer
          content={pageData?.content || ''}
          globalCharOffset={globalCharOffset}
          onScrollTo={handleScrollToCharReady}
          isLoading={isFetching}
        />

        <Box
          sx={{
            width: { xs: '100%', lg: '360px' },
            maxWidth: '100%',
          }}
        >
          {fileId && <BookmarksList onScrollToChar={handleScrollToBookmark} />}
        </Box>
      </Box>

      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        isFetching={isFetching}
        onPageChange={handlePageChange}
        showPageInfo={false}
      />
    </Box>
  );
};
