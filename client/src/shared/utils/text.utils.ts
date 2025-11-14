import { NOTE_COLORS } from '../constants/color.constants';
import type { IBookmark } from '../interfaces/bookmark.interface';

/**
 * Divides the text into tokens.
 * IMPORTANT: Space characters are appended to the previous non-space token
 * to reduce the number of DOM elements rendered.
 * @param content File content
 * @returns Array of tokens
 */
export const tokenizeContent = (content: string): string[] => {
  const rawTokens = content.match(/(\S+|\s+)/g) || [];
  const tokens: string[] = [];

  for (const token of rawTokens) {
    if (/\s+/.test(token)) {
      if (tokens.length > 0) {
        tokens[tokens.length - 1] += token;
      } else {
        tokens.push(token);
      }
    } else {
      tokens.push(token);
    }
  }

  return tokens;
};

/**
 * Returns a unique color based on the number of existing bookmarks
 * @param existingBookmarks Array of existing bookmarks
 * @returns Hex color
 */

export const getUniqueColor = (existingBookmarks: IBookmark[]): string => {
  const index = existingBookmarks.length % NOTE_COLORS.length;
  return NOTE_COLORS[index];
};
