import { Box, Paper, CircularProgress, Typography } from '@mui/material';
import {
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent,
} from 'react';

import { useWordSelection } from '@/features/file/hooks/useWordSelection';
import { useBookmarkStore } from '@/features/bookmark/store/bookmark.store';
import {
  useDeleteBookmarkMutation,
  useCreateBookmarkMutation,
} from '@/features/bookmark/api/bookmark.api';
import { SelectionTooltip } from '@/features/bookmark/ui/SelectionTooltip';
import { CreateBookmarkModal } from '@/features/bookmark/ui/CreateBookmarkModal';
import { DeleteBookmarkModal } from '@/features/bookmark/ui/DeleteBookmarkModal';
import { OverlapModal } from '@/features/bookmark/ui/OverlapModal';
import { tokenizeContent } from '@/shared/utils/text.utils';
import type { ScrollToCharFnType } from '@/shared/interfaces/file.interface';
import { CONTENT_HEIGHT } from '@/shared/constants/file.constants';

// TODO: split this into smaller components
interface IFileContentViewerProps {
  content: string;
  globalCharOffset: number;
  onScrollTo: (fn: ScrollToCharFnType) => void;
  isLoading: boolean;
}

export const FileContentViewer = ({
  content,
  globalCharOffset,
  onScrollTo,
  isLoading,
}: IFileContentViewerProps) => {
  const existingBookmarks = useBookmarkStore((state) => state.bookmarks);
  const tokens = useMemo(() => tokenizeContent(content), [content]);
  const { mutateAsync: deleteBookmarkAsync } = useDeleteBookmarkMutation();
  const { mutateAsync: createBookmarkAsync } = useCreateBookmarkMutation();

  const tokenPrefixSum = useMemo(() => {
    const sums: number[] = [0];
    let currentSum = 0;
    for (let i = 0; i < tokens.length; i++) {
      currentSum += tokens[i].length;
      sums.push(currentSum);
    }
    return sums;
  }, [tokens]);

  const {
    wordSelection,
    fragmentData,
    tooltipText,
    targetBookmark,
    createModalOpen,
    deleteModalOpen,
    overlapModalOpen,
    isTooltipOpen,
    tooltipPosition,
    handleWordClick,
    handleCloseCreateModal,
    handleCloseDeleteModal,
    handleCloseOverlapModal,
    handleOpenCreateModalFromTooltip,
    handleCloseTooltip,
    getOverlappingBookmarks,
    recalculateTooltipPosition,
  } = useWordSelection(tokens, globalCharOffset);

  const containerRef = useRef<HTMLDivElement>(null);

  const getPermanentBookmark = useCallback(
    (tokenIndex: number) => {
      const charIndexOnPage = tokenPrefixSum[tokenIndex] || 0;
      const globalChar = globalCharOffset + charIndexOnPage;

      return existingBookmarks.find((b) => {
        return b.startChar <= globalChar && b.endChar > globalChar;
      });
    },
    [existingBookmarks, globalCharOffset, tokenPrefixSum]
  );

  const isTokenSelected = useCallback(
    (tokenIndex: number) => {
      if (wordSelection.startTokenIndex === null) return false;

      const start = wordSelection.startTokenIndex;
      const end = wordSelection.endTokenIndex!; // TODO: fix type conflict

      return (
        tokenIndex >= Math.min(start, end) && tokenIndex <= Math.max(start, end)
      );
    },
    [wordSelection]
  );

  const handleDeleteAndCreateNew = useCallback(
    async (idsToDelete: string[], title: string, color: string) => {
      if (!fragmentData) return;

      for (const id of idsToDelete) {
        await deleteBookmarkAsync(id);
      }

      await createBookmarkAsync({
        ...fragmentData,
        title: title,
        color: color,
      });

      handleCloseOverlapModal();
    },
    [
      fragmentData,
      deleteBookmarkAsync,
      createBookmarkAsync,
      handleCloseOverlapModal,
    ]
  );

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const handleScroll = () => {
      if (isTooltipOpen) {
        recalculateTooltipPosition(containerElement);
      }
    };

    containerElement.addEventListener('scroll', handleScroll);

    if (isTooltipOpen) {
      recalculateTooltipPosition(containerElement);
    }

    return () => {
      containerElement.removeEventListener('scroll', handleScroll);
    };
  }, [recalculateTooltipPosition, isTooltipOpen]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollToChar: ScrollToCharFnType = (startChar: number) => {
      const relativeStartChar = startChar - globalCharOffset;

      let targetTokenIndex = -1;

      for (let i = 0; i < tokenPrefixSum.length - 1; i++) {
        const tokenStart = tokenPrefixSum[i];
        const tokenEnd = tokenPrefixSum[i + 1];

        if (relativeStartChar >= tokenStart && relativeStartChar < tokenEnd) {
          targetTokenIndex = i;
          break;
        }
        if (relativeStartChar < tokenStart) {
          targetTokenIndex = i > 0 ? i - 1 : 0;
          break;
        }
      }
      if (targetTokenIndex === -1 && tokens.length > 0) {
        targetTokenIndex = tokens.length - 1;
      }

      if (targetTokenIndex !== -1 && containerRef.current) {
        const targetElement = containerRef.current.children[
          targetTokenIndex
        ] as HTMLElement;

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    onScrollTo(scrollToChar);
  }, [tokens, globalCharOffset, onScrollTo, tokenPrefixSum]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: CONTENT_HEIGHT,
        overflowY: 'auto',
        backgroundColor: '#ffffff', // TODO: const or theme
        position: 'relative',
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography variant='body2' color='text.secondary'>
            Loading file content...
          </Typography>
        </Box>
      ) : (
        <Box
          ref={containerRef}
          sx={{
            fontSize: '1rem',
            lineHeight: 1.6,
            userSelect: 'none',
          }}
        >
          {tokens.map((token, index) => {
            const bookmark = getPermanentBookmark(index);
            const isPermanentBookmark = !!bookmark;
            const isSelected = isTokenSelected(index);

            const style: CSSProperties = {
              cursor: 'pointer',
              backgroundColor: isPermanentBookmark
                ? bookmark!.color
                : isSelected
                ? 'rgba(0, 150, 255, 0.3)'
                : 'transparent',
              display: 'inline',
            };

            return (
              <span
                key={index}
                onClick={(e: MouseEvent<HTMLSpanElement>) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleWordClick(
                    index,
                    isPermanentBookmark,
                    bookmark || undefined,
                    {
                      clientX: rect.left,
                      clientY: rect.top,
                      width: rect.width,
                    }
                  );
                }}
                style={style}
              >
                {token}
              </span>
            );
          })}
        </Box>
      )}

      {!isLoading && (
        <>
          <SelectionTooltip
            open={isTooltipOpen && !wordSelection.isComplete}
            onClose={handleCloseTooltip}
            onConfirm={handleOpenCreateModalFromTooltip}
            position={tooltipPosition}
            tooltipText={tooltipText}
          />

          {createModalOpen && (
            <CreateBookmarkModal
              open={createModalOpen}
              onClose={handleCloseCreateModal}
              initialData={fragmentData}
            />
          )}

          {deleteModalOpen && targetBookmark && (
            <DeleteBookmarkModal
              open={deleteModalOpen}
              onClose={handleCloseDeleteModal}
              bookmark={targetBookmark}
            />
          )}

          {overlapModalOpen && (
            <OverlapModal
              open={overlapModalOpen}
              onClose={handleCloseOverlapModal}
              initialData={fragmentData}
              overlappingBookmarks={getOverlappingBookmarks()}
              onDeleteAndCreateNew={handleDeleteAndCreateNew}
              onConfirmCreation={() => {}}
            />
          )}
        </>
      )}
    </Paper>
  );
};
