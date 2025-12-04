import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';

import { useDeleteBookmarkMutation } from '../../api/bookmark.api';
import { type IBookmark } from '@/shared/interfaces/bookmark.interface';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

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
        <AppButton
          label='Cancel'
          onClick={onClose}
          color='inherit'
          disabled={isDeleting}
        />

        <AppButton
          label={isDeleting ? 'Deleting...' : 'Delete'}
          isLoading={isDeleting}
          onClick={handleDelete}
          color='error'
          variant='contained'
          disabled={isDeleting}
        />
      </DialogActions>
    </Dialog>
  );
};
