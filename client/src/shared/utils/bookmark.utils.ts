import { toast } from 'react-toastify';
import { MAX_BOOKMARK_SIZE } from '../constants/bookmark.constants';

export const errorSizeBookmarkCreating = (bookmarkSize: number) => {
  if (bookmarkSize > MAX_BOOKMARK_SIZE) {
    toast.error(
      `Bookmark size should be less than ${MAX_BOOKMARK_SIZE} chars. Please, create more shorter bookmark.`
    );

    return false;
  }

  return true;
};
