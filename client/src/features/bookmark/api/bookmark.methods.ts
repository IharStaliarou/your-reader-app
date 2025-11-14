import {
  API_BOOKMARKS_URL,
  API_GET_BOOKMARKS_BY_FILE_URL,
  API_DELETE_BOOKMARK_URL,
} from '@/shared/constants/api.constants';
import { $api } from '@/shared/api/instance.api';
import type {
  IBookmark,
  ICreateBookmarkDto,
} from '@/shared/interfaces/bookmark.interface';

export const fetchFileBookmarks = async (
  fileId: string
): Promise<IBookmark[]> => {
  const response = await $api.get<IBookmark[]>(
    API_GET_BOOKMARKS_BY_FILE_URL(fileId)
  );
  return response.data;
};

export const createBookmark = async (
  dto: ICreateBookmarkDto
): Promise<IBookmark> => {
  const response = await $api.post<IBookmark>(API_BOOKMARKS_URL, dto);
  return response.data;
};

export const deleteBookmark = async (
  bookmarkId: string
): Promise<{ message: string }> => {
  const response = await $api.delete<{ message: string }>(
    API_DELETE_BOOKMARK_URL(bookmarkId)
  );
  return response.data;
};
