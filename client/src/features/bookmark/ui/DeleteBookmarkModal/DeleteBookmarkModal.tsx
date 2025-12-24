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
import { APP_COLORS } from '@/shared/constants/color.constants';
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
      <DialogTitle sx={{ fontSize: { xs: '18px', md: '20px' } }}>
        Delete Bookmark? 🗑️
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant='body1' gutterBottom>
          Are you sure you want to delete this bookmark? This action cannot be
          undone.
        </Typography>

        <Box
          sx={{
            mt: 2,
            p: 1.5,
            backgroundColor: APP_COLORS.surface,
            borderRadius: 1,
            borderLeft: `4px solid ${
              bookmark.color || APP_COLORS['note-pink']
            }`,
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

      <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
        <AppButton
          label='Cancel'
          onClick={onClose}
          color='inherit'
          disabled={isDeleting}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        />

        <AppButton
          label={isDeleting ? 'Deleting...' : 'Delete'}
          isLoading={isDeleting}
          onClick={handleDelete}
          color='error'
          variant='contained'
          disabled={isDeleting}
          sx={{ ml: { sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
        />
      </DialogActions>
    </Dialog>
  );
};
