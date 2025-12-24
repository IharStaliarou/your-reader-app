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
import { APP_COLORS, NOTE_COLORS } from '@/shared/constants/color.constants';
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
      <DialogTitle sx={{ fontSize: { xs: '18px', md: '20px' } }}>
        Create New Bookmark 📝
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
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
                        ? `3px solid ${APP_COLORS['border-strong']}`
                        : `1px solid ${APP_COLORS['border-muted']}`,
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
              p: { xs: 1.25, sm: 1.5 },
              backgroundColor: APP_COLORS.surface,
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

        <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
          <AppButton
            label='Cancel'
            onClick={onClose}
            color='inherit'
            disabled={isCreating}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          />

          <AppButton
            label='Save Bookmark'
            isLoading={isCreating}
            type='submit'
            color='primary'
            variant='contained'
            disabled={isCreating}
            sx={{ ml: { sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
