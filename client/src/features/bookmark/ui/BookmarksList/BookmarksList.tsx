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
import { APP_COLORS } from '@/shared/constants/color.constants';

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
    <Box
      mt={3}
      sx={{
        maxHeight: { xs: '50vh', md: 'calc(100vh - 220px)' },
        overflowY: 'auto',
        width: '100%',
      }}
    >
      <Typography
        variant='h6'
        gutterBottom
        sx={{ fontSize: { xs: '18px', md: '20px' } }}
      >
        Bookmarks ({bookmarks.length})
      </Typography>
      <List
        dense
        disablePadding
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', md: '420px', lg: '500px' },
        }}
      >
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

              borderLeft: `4px solid ${
                bookmark.color || APP_COLORS['border-muted']
              }`,
              mb: 1,
              borderRadius: 1,
              backgroundColor: APP_COLORS['surface-weak'],
              transition: 'background-color 0.2s',
              '&:hover': { backgroundColor: APP_COLORS.surface },
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
