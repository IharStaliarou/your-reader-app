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
    <Box>
      <Typography variant='h4'>{getFileTitle(currentFile)}</Typography>

      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        isFetching={isFetching}
        onPageChange={handlePageChange}
        showPageInfo={true}
      />

      <Box className='flex justify-between gap-5'>
        <FileContentViewer
          content={pageData?.content || ''}
          globalCharOffset={globalCharOffset}
          onScrollTo={handleScrollToCharReady}
          isLoading={isFetching}
        />

        <Box sx={{ border: '1px solid red' }}>
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
