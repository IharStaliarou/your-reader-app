import {
  useState,
  useCallback,
  useMemo,
  type Dispatch,
  type SetStateAction,
  useEffect,
  type MouseEvent,
} from 'react';

import { useBookmarkStore } from '@/features/bookmark/store/bookmark.store';
import { getUniqueColor } from '@/shared/utils/text.utils';
import type {
  IBookmark,
  IFragmentData,
  IWordSelectionState,
} from '@/shared/interfaces/bookmark.interface';

// TODO: destructure this
export interface IUseWordSelectionResult {
  wordSelection: IWordSelectionState;
  fragmentData: IFragmentData;
  tooltipText: string;
  targetBookmark: IBookmark | null;
  createModalOpen: boolean;
  deleteModalOpen: boolean;
  overlapModalOpen: boolean;
  isTooltipOpen: boolean;
  tooltipPosition: { x: number; y: number };
  handleWordClick: (
    tokenIndex: number,
    isPermanentBookmark: boolean,
    clickedBookmark?: IBookmark,
    clickEvent?: MouseEvent<HTMLSpanElement>
  ) => void;
  handleCloseCreateModal: () => void;
  handleCloseDeleteModal: () => void;
  handleCloseOverlapModal: () => void;
  getOverlappingBookmarks: () => IBookmark[];
  handleOpenCreateModalFromTooltip: () => void;
  handleCloseTooltip: () => void;
  setTargetBookmark: Dispatch<SetStateAction<IBookmark | null>>;
  setCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useWordSelection = (
  tokens: string[],
  globalCharOffset: number = 0
): IUseWordSelectionResult => {
  const existingBookmarks = useBookmarkStore((state) => state.bookmarks);

  const [wordSelection, setWordSelection] = useState<IWordSelectionState>({
    startTokenIndex: null,
    endTokenIndex: null,
    isComplete: false,
  });

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [overlapModalOpen, setOverlapModalOpen] = useState(false);
  const [targetBookmark, setTargetBookmark] = useState<IBookmark | null>(null);
  const [tooltipText, setTooltipText] = useState('Select start word');
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const tokenLengths = useMemo(
    () => tokens.map((token) => token.length),
    [tokens]
  );

  const tokenPrefixSum = useMemo(() => {
    const sums: number[] = [0];
    let currentSum = 0;
    for (let i = 0; i < tokenLengths.length; i++) {
      currentSum += tokenLengths[i];
      sums.push(currentSum);
    }
    return sums;
  }, [tokenLengths]);

  useEffect(() => {
    setWordSelection({
      startTokenIndex: null,
      endTokenIndex: null,
      isComplete: false,
    });
    setCreateModalOpen(false);
    setOverlapModalOpen(false);
    setTooltipText('Select start word');
    setIsTooltipOpen(false);
  }, [globalCharOffset]);

  const getCharBoundaries = useCallback(
    (startToken: number, endToken: number) => {
      const startCharOnPage = tokenPrefixSum[startToken] || 0;
      const endCharOnPage = tokenPrefixSum[endToken + 1] || 0;

      const startChar = startCharOnPage + globalCharOffset;
      const endChar = endCharOnPage + globalCharOffset;

      return { startChar, endChar };
    },
    [globalCharOffset, tokenPrefixSum]
  );

  const fragmentData: IFragmentData = useMemo(() => {
    const { startTokenIndex, endTokenIndex } = wordSelection;
    if (startTokenIndex === null || endTokenIndex === null) {
      return {
        textFragment: '',
        startChar: 0,
        endChar: 0,
        color: getUniqueColor(existingBookmarks),
      };
    }

    const minToken = Math.min(startTokenIndex, endTokenIndex);
    const maxToken = Math.max(startTokenIndex, endTokenIndex);

    const { startChar, endChar } = getCharBoundaries(minToken, maxToken);

    const selectedTokens = tokens.slice(minToken, maxToken + 1);
    const textFragment = selectedTokens.join('');

    return {
      textFragment,
      startChar,
      endChar,
      color: getUniqueColor(existingBookmarks),
    };
  }, [wordSelection, tokens, existingBookmarks, getCharBoundaries]);

  const checkOverlap = useCallback(
    (newStartChar: number, newEndChar: number): IBookmark[] => {
      return existingBookmarks.filter((bookmark) => {
        return (
          newStartChar < bookmark.endChar && newEndChar > bookmark.startChar
        );
      });
    },
    [existingBookmarks]
  );

  const getOverlappingBookmarks = useCallback(() => {
    return checkOverlap(fragmentData.startChar, fragmentData.endChar);
  }, [fragmentData.startChar, fragmentData.endChar, checkOverlap]);

  const handleWordClick = useCallback(
    (
      tokenIndex: number,
      isPermanentBookmark: boolean,
      clickedBookmark?: IBookmark,
      clickEvent?: MouseEvent<HTMLSpanElement>
    ) => {
      setIsTooltipOpen(false);

      if (isPermanentBookmark && clickedBookmark) {
        setTargetBookmark(clickedBookmark);
        setDeleteModalOpen(true);
        return;
      }

      setWordSelection((prev) => {
        if (prev.startTokenIndex === null || prev.isComplete) {
          if (clickEvent) {
            setTooltipPosition({
              x: clickEvent.clientX,
              y: clickEvent.clientY,
            });
            setIsTooltipOpen(true);
          }
          setTooltipText('Select more or create bookmark');
          return {
            startTokenIndex: tokenIndex,
            endTokenIndex: tokenIndex,
            isComplete: false,
          };
        }

        const currentStart = prev.startTokenIndex;
        const newStart = Math.min(currentStart, tokenIndex);
        const newEnd = Math.max(currentStart, tokenIndex);

        const isAdjacent =
          tokenIndex >= newStart - 1 && tokenIndex <= newEnd + 1;

        if (isAdjacent) {
          if (clickEvent) {
            setTooltipPosition({
              x: clickEvent.clientX,
              y: clickEvent.clientY,
            });
            setIsTooltipOpen(true);
          }
          setTooltipText('Select more or create bookmark');
          return {
            startTokenIndex: newStart,
            endTokenIndex: newEnd,
            isComplete: false,
          };
        } else {
          const { startChar: selectionStart, endChar: selectionEnd } =
            getCharBoundaries(newStart, newEnd);
          const overlappingBookmarks = checkOverlap(
            selectionStart,
            selectionEnd
          );

          if (overlappingBookmarks.length > 0) {
            setOverlapModalOpen(true);
            setTooltipText('Overlap detected. Check modal window.');
          } else {
            setCreateModalOpen(true);
            setTooltipText('Selection completed. Click to start new word.');
          }

          return {
            startTokenIndex: newStart,
            endTokenIndex: newEnd,
            isComplete: true,
          };
        }
      });
    },
    [checkOverlap, getCharBoundaries]
  );

  const handleOpenCreateModalFromTooltip = useCallback(() => {
    setIsTooltipOpen(false);
    const overlapping = getOverlappingBookmarks();

    if (overlapping.length > 0) {
      setOverlapModalOpen(true);
      setTooltipText('Overlap detected. Check modal window.');
      setWordSelection((prev) => ({ ...prev, isComplete: true }));
    } else {
      setCreateModalOpen(true);
      setTooltipText('Selection completed. Click to start new word.');
      setWordSelection((prev) => ({ ...prev, isComplete: true }));
    }
  }, [getOverlappingBookmarks]);

  const handleCloseTooltip = useCallback(() => {
    setIsTooltipOpen(false);
    if (!wordSelection.isComplete) {
      setTooltipText('Select more or create bookmark');
    } else {
      setTooltipText('Selection completed. Click to start new word.');
    }
  }, [wordSelection.isComplete]);

  const handleCloseCreateModal = useCallback(() => {
    setCreateModalOpen(false);
    setWordSelection({
      startTokenIndex: null,
      endTokenIndex: null,
      isComplete: false,
    });
    setTooltipText('Select start word');
  }, []);

  const handleCloseOverlapModal = useCallback(() => {
    setOverlapModalOpen(false);
    setWordSelection({
      startTokenIndex: null,
      endTokenIndex: null,
      isComplete: false,
    });
    setTooltipText('Select start word');
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setTargetBookmark(null);
  }, []);

  return {
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
    setTargetBookmark,
    setCreateModalOpen,
    setDeleteModalOpen,
  };
};
