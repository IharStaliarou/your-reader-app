import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Grid,
} from '@mui/material';
import { useState, useEffect } from 'react';

import type {
  IBookmark,
  ICreateBookmarkInitialData,
} from '@/shared/interfaces/bookmark.interface';
import {
  useDeleteBookmarkMutation,
  useCreateBookmarkMutation,
} from '../api/bookmark.api';
import { NOTE_COLORS } from '@/shared/constants/color.constants';

interface IOverlapModalProps {
  open: boolean;
  onClose: () => void;
  initialData: ICreateBookmarkInitialData;
  overlappingBookmarks: IBookmark[];
  onConfirmCreation: () => void;
  onDeleteAndCreateNew: (
    idsToDelete: string[],
    title: string,
    color: string
  ) => void;
}

export const OverlapModal = ({
  open,
  onClose,
  initialData,
  overlappingBookmarks,
  onDeleteAndCreateNew,
}: IOverlapModalProps) => {
  const isPending =
    useDeleteBookmarkMutation().isPending ||
    useCreateBookmarkMutation().isPending;
  const idsToDelete = overlappingBookmarks.map((b) => b.id);

  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(initialData.color);

  useEffect(() => {
    if (open) {
      setSelectedColor(initialData.color);
    }
  }, [open, initialData.color]);

  const handleForceCreate = () => {
    onDeleteAndCreateNew(
      idsToDelete,
      title.trim() || 'Untitled Note',
      selectedColor
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ color: 'error.main' }}>
        🛑 Overlap Warning: Cannot Create Note
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant='body1' gutterBottom>
          The selected text fragment **overlaps** with the following existing
          notes. You must resolve this conflict to proceed.
        </Typography>

        <TextField
          autoFocus
          margin='dense'
          label='New Note Title (Optional)'
          type='text'
          fullWidth
          variant='outlined'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          sx={{ my: 2 }}
        />
        <Typography variant='subtitle2' gutterBottom>
          Color Tag for New Note:
        </Typography>

        <Grid container spacing={1} sx={{ mb: 2 }}>
          {NOTE_COLORS.map((color) => (
            <Grid key={color}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: color,
                  cursor: 'pointer',
                  border:
                    selectedColor === color
                      ? `3px solid #333`
                      : '1px solid #ccc',
                  transition: 'border 0.2s',
                  '&:hover': { opacity: 0.8 },
                }}
                onClick={() => setSelectedColor(color)}
              />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            backgroundColor: '#ffeeee',
            borderRadius: 1,
            borderLeft: `4px solid ${selectedColor || 'red'}`,
          }}
        >
          <Typography variant='subtitle2' color='error'>
            Your selected fragment:
          </Typography>

          <Typography variant='body2' sx={{ fontStyle: 'italic', mt: 0.5 }}>
            "{initialData.textFragment.substring(0, 100)}..."
          </Typography>
        </Box>

        <Typography variant='subtitle1' sx={{ mt: 2, mb: 1 }}>
          Overlapping Notes ({overlappingBookmarks.length}):
        </Typography>

        <Box sx={{ maxHeight: 150, overflowY: 'auto' }}>
          {overlappingBookmarks.map((b) => (
            <Box
              key={b.id}
              sx={{
                mb: 1,
                p: 1,
                borderLeft: `3px solid ${b.color || '#ccc'}`,
                backgroundColor: '#f9f9f9',
              }}
            >
              <Typography variant='body2'>
                **{b.title || 'Untitled Note'}** ({b.startChar}- {b.endChar})
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography variant='body2' sx={{ mt: 2, fontWeight: 'bold' }}>
          Choose an action:
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='inherit' disabled={isPending}>
          Cancel (Exit)
        </Button>

        <Button
          onClick={handleForceCreate}
          color='error'
          variant='contained'
          disabled={isPending}
          sx={{ ml: 2 }}
        >
          {isPending ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            'Delete All & Create New'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
