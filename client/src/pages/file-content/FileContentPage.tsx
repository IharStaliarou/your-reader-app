import { useState, useCallback, useEffect, type ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, Pagination } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useGetFileContentQuery } from '@/features/file/api/file.api';
import { FileContentViewer } from '@/features/file/ui/FileContentViewer';
import { useFileStore } from '@/features/file/store/file.store';
import { BookmarksList } from '@/features/bookmark/ui/BookmarksList';
import { useGetFileBookmarksQuery } from '@/features/bookmark/api/bookmark.api';
import type { ScrollToCharFnType } from '@/shared/interfaces/file.interface';
import { PAGE_SIZE } from '@/shared/constants/file.constants';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

export const FileContentPage = () => {
  useGetFileBookmarksQuery();

  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();
  const { setActiveFileId, clearActiveFileId } = useFileStore();

  const [scrollToCharFn, setScrollToCharFn] =
    useState<ScrollToCharFnType | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingScrollChar, setPendingScrollChar] = useState<number | null>(
    null
  );
  const [savedTotalPages, setSavedTotalPages] = useState(1);

  if (!fileId) {
    return <Alert severity='error'>File ID is missing.</Alert>;
  }

  useEffect(() => {
    setActiveFileId(fileId);
    return () => clearActiveFileId();
  }, [fileId, setActiveFileId, clearActiveFileId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const {
    data: pageData,
    isLoading: isLoadingContent,
    isError: isErrorContent,
    error: errorContent,
    isFetching,
  } = useGetFileContentQuery({
    fileId,
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    if (pageData && pageData.totalPages !== savedTotalPages) {
      setSavedTotalPages(pageData.totalPages);
    }
  }, [pageData, savedTotalPages]);

  useEffect(() => {
    if (
      pendingScrollChar !== null &&
      !isFetching &&
      pageData &&
      scrollToCharFn
    ) {
      if (
        pendingScrollChar >= pageData.startCharIndex &&
        pendingScrollChar < pageData.endCharIndex
      ) {
        scrollToCharFn(pendingScrollChar);
      }
      setPendingScrollChar(null);
    }
  }, [pendingScrollChar, isFetching, pageData, scrollToCharFn, currentPage]);

  const handleScrollToCharReady = useCallback((fn: ScrollToCharFnType) => {
    setScrollToCharFn(() => fn);
  }, []);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const totalPages = savedTotalPages;
  const globalCharOffset = pageData?.startCharIndex || 0;

  const handleScrollToBookmark = useCallback(
    (globalStartChar: number) => {
      const targetPage = Math.floor(globalStartChar / PAGE_SIZE) + 1;

      if (targetPage !== currentPage) {
        setPendingScrollChar(globalStartChar);
        setCurrentPage(targetPage);
      } else if (scrollToCharFn) {
        scrollToCharFn(globalStartChar);
      }
    },
    [currentPage, scrollToCharFn]
  );

  return (
    <Box>
      <Box className='flex flex-col gap-5'>
        <AppButton
          label='Back to My Files'
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          className='w-60'
        />
        <Typography variant='h4'>Viewing File Page</Typography>
      </Box>

      <Box>
        <Typography variant='h6' gutterBottom>
          Page {currentPage} of {totalPages}
        </Typography>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
          disabled={isFetching}
          className='my-4 flex justify-center'
        />

        <Box className='flex justify-between gap-5'>
          <FileContentViewer
            content={pageData?.content || ''}
            globalCharOffset={globalCharOffset}
            onScrollTo={handleScrollToCharReady}
            isLoading={isFetching}
          />
          <Box sx={{ border: '1px solid red' }}>
            {activeTab === 0 && fileId && (
              <BookmarksList onScrollToChar={handleScrollToBookmark} />
            )}
          </Box>
        </Box>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
          disabled={isFetching}
          className='my-4 flex justify-center'
        />
      </Box>
    </Box>
  );
};
