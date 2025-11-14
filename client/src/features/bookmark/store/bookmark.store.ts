import { create } from 'zustand';

import type { IBookmark } from '@/shared/interfaces/bookmark.interface';

interface IBookmarkState {
  bookmarks: IBookmark[];
  isLoading: boolean;
}

interface IBookmarkActions {
  setBookmarks: (bookmarks: IBookmark[]) => void;
  addBookmark: (bookmark: IBookmark) => void;
  removeBookmark: (bookmarkId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useBookmarkStore = create<IBookmarkState & IBookmarkActions>(
  (set) => ({
    bookmarks: [],
    isLoading: false,

    setBookmarks: (bookmarks) => set({ bookmarks, isLoading: false }),
    addBookmark: (newBookmark) =>
      set((state) => ({
        bookmarks: [...state.bookmarks, newBookmark].sort(
          (a, b) => a.startChar - b.startChar
        ),
      })),
    removeBookmark: (bookmarkId) =>
      set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b.id !== bookmarkId),
      })),
    setLoading: (loading) => set({ isLoading: loading }),
  })
);
