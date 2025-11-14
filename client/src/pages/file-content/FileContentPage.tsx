import {
  useState,
  useCallback,
  useEffect,
  type SyntheticEvent,
  type ChangeEvent,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Alert,
  Grid,
  Tabs,
  Tab,
  Pagination,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useGetFileContentQuery } from '@/features/file/api/file.api';
import { QueryStatusRenderer } from '@/shared/ui/QueryStatusRenderer';
import { FileContentViewer } from '@/features/file/ui/FileContentViewer';
import { useFileStore } from '@/features/file/store/file.store';
import { BookmarksList } from '@/features/bookmark/ui/BookmarksList';
import { useGetFileBookmarksQuery } from '@/features/bookmark/api/bookmark.api';
import type { ScrollToCharFnType } from '@/shared/interfaces/file.interface';
import { PAGE_SIZE } from '@/shared/constants/file.constants';

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

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

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
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to My Files
      </Button>
      <Typography variant='h4' gutterBottom>
        📄 Viewing File Content
      </Typography>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Typography variant='h6' gutterBottom>
            Page {currentPage} of {totalPages}
          </Typography>

          {totalPages > 1 && (
            <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                disabled={isFetching}
              />
            </Box>
          )}

          <QueryStatusRenderer
            isLoading={isLoadingContent && !pageData}
            isError={isErrorContent}
            error={errorContent}
            errorMessage='Error loading file content.'
          >
            <FileContentViewer
              content={pageData?.content || ''}
              globalCharOffset={globalCharOffset}
              onScrollTo={handleScrollToCharReady}
              isLoading={isFetching}
            />
          </QueryStatusRenderer>

          {totalPages > 1 && (
            <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                disabled={isFetching}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label='sidebar tabs'
            >
              <Tab label='Bookmarks' />
              <Tab label='Summary' />
            </Tabs>
          </Box>

          <Box sx={{ pt: 1 }}>
            {activeTab === 0 && fileId && (
              <BookmarksList
                onScrollToChar={handleScrollToBookmark}
                fileId={fileId} // TODO: resolve
              />
            )}

            {activeTab === 1 && (
              <Box sx={{ p: 2 }}>
                <Typography color='text.secondary'>
                  [AI Summary of the file content will be generated here.]
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
