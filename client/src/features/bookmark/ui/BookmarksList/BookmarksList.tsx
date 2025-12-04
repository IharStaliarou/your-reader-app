import { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';

import { useBookmarkStore } from '../../store/bookmark.store';
import { useDeleteBookmarkMutation } from '../../api/bookmark.api';
import { DeleteBookmarkModal } from '../DeleteBookmarkModal/DeleteBookmarkModal';
import type { IBookmark } from '@/shared/interfaces/bookmark.interface';

interface IBookmarksListProps {
  onScrollToChar: (startChar: number) => void;
}

export const BookmarksList = ({ onScrollToChar }: IBookmarksListProps) => {
  const { bookmarks, isLoading } = useBookmarkStore();
  const { isPending: isDeleting } = useDeleteBookmarkMutation();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<IBookmark | null>(
    null
  );

  const handleOpenDeleteModal = (bookmark: IBookmark) => {
    setBookmarkToDelete(bookmark);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setBookmarkToDelete(null);
    setDeleteModalOpen(false);
  };

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' p={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <Box p={2}>
        <Typography variant='body2' color='textSecondary'>
          No bookmarks found for this file.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={3} sx={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
      <Typography variant='h6' gutterBottom>
        Bookmarks ({bookmarks.length})
      </Typography>
      <List dense disablePadding sx={{ width: '600px' }}>
        {bookmarks.map((bookmark) => (
          <ListItem
            key={bookmark.id}
            secondaryAction={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  edge='end'
                  aria-label='go to fragment'
                  onClick={() => onScrollToChar(bookmark.startChar)}
                  sx={{ mr: 1 }}
                >
                  <KeyboardArrowRightIcon fontSize='small' />
                </IconButton>

                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDeleteModal(bookmark);
                  }}
                  disabled={isDeleting}
                  color='error'
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Box>
            }
            sx={{
              pr: 2,
              py: 1,

              borderLeft: `4px solid ${bookmark.color || '#ccc'}`,
              mb: 1,
              borderRadius: 1,
              backgroundColor: '#fafafa',
              transition: 'background-color 0.2s',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            <ListItemText
              primary={bookmark.title || 'Untitled Bookmark'}
              secondary={`Fragment: "${bookmark.textFragment.substring(
                0,
                50
              )}..."`}
              primaryTypographyProps={{
                style: {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '90%',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
      {isDeleteModalOpen && bookmarkToDelete && (
        <DeleteBookmarkModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          bookmark={bookmarkToDelete}
        />
      )}
    </Box>
  );
};
