import { useState, useEffect, type FormEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Grid,
} from '@mui/material';

import { useCreateBookmarkMutation } from '../../api/bookmark.api';
import {
  type ICreateBookmarkDto,
  type ICreateBookmarkInitialData,
} from '@/shared/interfaces/bookmark.interface';
import { useFileStore } from '@/features/file/store/file.store';
import { NOTE_COLORS } from '@/shared/constants/color.constants';
import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { CommonTextField } from '@/shared/ui/CommonTextField/CommonTextField';

interface ICreateBookmarkModalProps {
  open: boolean;
  onClose: () => void;
  initialData: ICreateBookmarkInitialData;
}

export const CreateBookmarkModal = ({
  open,
  onClose,
  initialData,
}: ICreateBookmarkModalProps) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(initialData.color);
  const { activeFileId } = useFileStore((state) => state);

  const { mutate: createBookmark, isPending: isCreating } =
    useCreateBookmarkMutation();

  useEffect(() => {
    if (open) {
      setTitle('');
      setSelectedColor(initialData.color);
    }
  }, [open, initialData.color]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!activeFileId) {
      console.error('File ID is missing.');
      return;
    }

    const bookmarkDto: Omit<ICreateBookmarkDto, 'fileId'> = {
      title: title.trim() || 'Untitled Note',
      textFragment: initialData.textFragment,
      startChar: initialData.startChar,
      endChar: initialData.endChar,
      color: selectedColor,
    };

    console.log('Attempting to create bookmark:', bookmarkDto);

    createBookmark(bookmarkDto, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Create New Bookmark 📝</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <CommonTextField
            autoFocus
            label='Title (Optional)'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isCreating}
            sx={{ mb: 2 }}
          />

          <Typography variant='subtitle2' gutterBottom>
            Color Tag:
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
              p: 1.5,
              backgroundColor: '#f5f5f5',
              borderRadius: 1,
              borderLeft: `4px solid ${selectedColor}`,
            }}
          >
            <Typography variant='subtitle2' color='text.secondary'>
              Selected Fragment:
            </Typography>
            <Typography variant='body2' sx={{ fontStyle: 'italic', mt: 0.5 }}>
              "{initialData.textFragment}"
            </Typography>
          </Box>

          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ mt: 1, display: 'block' }}
          >
            Start: {initialData.startChar}, End: {initialData.endChar}
          </Typography>
        </DialogContent>

        <DialogActions>
          <AppButton
            label='Cancel'
            onClick={onClose}
            color='inherit'
            disabled={isCreating}
          />

          <AppButton
            label='Save Bookmark'
            isLoading={isCreating}
            type='submit'
            color='primary'
            variant='contained'
            disabled={isCreating}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
