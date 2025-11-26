import { useState, useCallback, useEffect, type ChangeEvent } from 'react';
import { useGetFileContentQuery } from '@/features/file/api/file.api';
import type { ScrollToCharFnType } from '@/shared/interfaces/file.interface';
import { PAGE_SIZE } from '@/shared/constants/file.constants';

interface UseFilePaginationResult {
  currentPage: number;
  totalPages: number;
  isFetching: boolean;
  pageData: ReturnType<typeof useGetFileContentQuery>['data'];
  globalCharOffset: number;

  handlePageChange: (_event: ChangeEvent<unknown>, value: number) => void;
  handleScrollToCharReady: (fn: ScrollToCharFnType) => void;
  handleScrollToBookmark: (globalStartChar: number) => void;
}

export const useFilePagination = (fileId: string): UseFilePaginationResult => {
  const [scrollToCharFn, setScrollToCharFn] =
    useState<ScrollToCharFnType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingScrollChar, setPendingScrollChar] = useState<number | null>(
    null
  );
  const [savedTotalPages, setSavedTotalPages] = useState(0);

  const { data: pageData, isFetching } = useGetFileContentQuery({
    fileId,
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (pageData && pageData.totalPages !== savedTotalPages) {
      setSavedTotalPages(pageData.totalPages);
    }
  }, [currentPage, pageData, savedTotalPages]);

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

  // Смена страницы
  const handlePageChange = useCallback(
    (_event: ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
    },
    []
  );

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

  const totalPages = savedTotalPages;
  const globalCharOffset = pageData?.startCharIndex || 0;

  return {
    currentPage,
    totalPages,
    isFetching,
    pageData,
    globalCharOffset,
    handlePageChange,
    handleScrollToCharReady,
    handleScrollToBookmark,
  };
};
