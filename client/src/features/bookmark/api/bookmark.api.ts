import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { extractErrorMessage } from '@/shared/utils/error.utils';
import { useBookmarkStore } from '@/features/bookmark/store/bookmark.store';
import { useFileStore } from '@/features/file/store/file.store';
import type {
  IBookmark,
  ICreateBookmarkDto,
} from '@/shared/interfaces/bookmark.interface';
import {
  createBookmark,
  deleteBookmark,
  fetchFileBookmarks,
} from './bookmark.methods';
import { BOOKMARK_QUERY_KEYS } from '@/shared/constants/queryKeys.constants';
import { BOOKMARK_CACHE_TIME_MS } from '@/shared/constants/bookmark.constants';

export const useGetFileBookmarksQuery = () => {
  const fileId = useFileStore((state) => state.activeFileId);
  const { setBookmarks, setLoading } = useBookmarkStore();

  const queryResult = useQuery<IBookmark[], AxiosError>({
    queryKey: BOOKMARK_QUERY_KEYS.fileBookmarks(fileId || 'null'),
    queryFn: () => fetchFileBookmarks(fileId!),
    enabled: !!fileId,
    staleTime: BOOKMARK_CACHE_TIME_MS,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const { data, error, isFetching } = queryResult;

    setLoading(isFetching);

    if (data) {
      setBookmarks(data);
    }

    if (error) {
      setBookmarks([]);
      toast.error(extractErrorMessage(error, 'Failed to load bookmarks.'));
    }
  }, [
    queryResult.data,
    queryResult.error,
    queryResult.isFetching,
    setBookmarks,
    setLoading,
  ]);

  return queryResult;
};

export const useCreateBookmarkMutation = () => {
  const { addBookmark } = useBookmarkStore();
  const fileId = useFileStore((state) => state.activeFileId);

  return useMutation({
    mutationFn: (dto: Omit<ICreateBookmarkDto, 'fileId'>) =>
      createBookmark({
        ...dto,
        fileId: fileId!,
      }),
    onSuccess: (newBookmark) => {
      addBookmark(newBookmark);
      toast.success('Bookmark created successfully!');
    },
    onError: (error: AxiosError<any>) => {
      toast.error(extractErrorMessage(error, 'Error creating bookmark.'));
    },
  });
};

export const useDeleteBookmarkMutation = () => {
  const { removeBookmark } = useBookmarkStore();

  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: (data, bookmarkId) => {
      removeBookmark(bookmarkId);
      toast.success(data.message || 'Bookmark deleted successfully!');
    },
    onError: (error: AxiosError<any>) => {
      toast.error(extractErrorMessage(error, 'Error deleting bookmark.'));
    },
  });
};
