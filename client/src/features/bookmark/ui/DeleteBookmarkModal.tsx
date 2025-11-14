import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

import { type IBookmark } from '@/shared/interfaces/bookmark.interface';
import { useDeleteBookmarkMutation } from '../api/bookmark.api';

// TODO: create universal modal for all actions
interface IDeleteBookmarkModalProps {
  open: boolean;
  onClose: () => void;
  bookmark: IBookmark;
}

export const DeleteBookmarkModal = ({
  open,
  onClose,
  bookmark,
}: IDeleteBookmarkModalProps) => {
  const { mutate: deleteBookmark, isPending: isDeleting } =
    useDeleteBookmarkMutation();

  const handleDelete = () => {
    deleteBookmark(bookmark.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>Delete Bookmark? 🗑️</DialogTitle>

      <DialogContent dividers>
        <Typography variant='body1' gutterBottom>
          Are you sure you want to delete this bookmark? This action cannot be
          undone.
        </Typography>

        <Box
          sx={{
            mt: 2,
            p: 1.5,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            borderLeft: `4px solid ${bookmark.color || '#ff677d'}`,
          }}
        >
          <Typography variant='subtitle2' color='text.secondary'>
            Title: **{bookmark.title || 'Untitled'}**
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontStyle: 'italic',
              mt: 0.5,
              maxHeight: 60,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Fragment: "{bookmark.textFragment}"
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='inherit' disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color='error'
          variant='contained'
          disabled={isDeleting}
        >
          {isDeleting ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            'Delete'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
