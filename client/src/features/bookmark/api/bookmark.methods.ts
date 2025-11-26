import { API_ENDPOINTS } from '@/shared/constants/api.constants';
import { $api } from '@/shared/api/instance.api';
import type {
  IBookmark,
  ICreateBookmarkDto,
} from '@/shared/interfaces/bookmark.interface';

export const fetchFileBookmarks = async (
  fileId: string
): Promise<IBookmark[]> => {
  const response = await $api.get<IBookmark[]>(
    API_ENDPOINTS.BOOKMARKS.GET_ALL_BY_FILE(fileId)
  );
  return response.data;
};

export const createBookmark = async (
  dto: ICreateBookmarkDto
): Promise<IBookmark> => {
  const response = await $api.post<IBookmark>(
    API_ENDPOINTS.BOOKMARKS.BASE,
    dto
  );
  return response.data;
};

export const deleteBookmark = async (
  bookmarkId: string
): Promise<{ message: string }> => {
  const response = await $api.delete<{ message: string }>(
    API_ENDPOINTS.BOOKMARKS.DELETE(bookmarkId)
  );
  return response.data;
};
