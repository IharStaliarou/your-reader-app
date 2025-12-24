import type { CSSProperties } from 'react';
import { Box, ClickAwayListener, Paper, Typography } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import { AppButton } from '@/shared/ui/AppButton/AppButton';

interface ISelectionTooltipProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  position: { x: number; y: number };
  tooltipText: string;
}

export const SelectionTooltip = ({
  open,
  onClose,
  onConfirm,
  position,
  tooltipText,
}: ISelectionTooltipProps) => {
  if (!open) return null;

  const style: CSSProperties = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    zIndex: 100,
    transform: 'translateY(-100%)',
    maxWidth: 280,
    width: 'max-content',
  };

  return (
    <ClickAwayListener onClickAway={() => {}}>
      <Paper elevation={8} sx={style}>
        <Box sx={{ p: { xs: 1.25, sm: 1.5 } }}>
          <Typography variant='body2' sx={{ mb: 1, color: 'text.secondary' }}>
            {tooltipText}
          </Typography>
          <Box
            className='flex gap-2'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
          >
            <AppButton
              label='Cancel'
              onClick={onClose}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            />
            <AppButton
              label='Add to bookmarks'
              size='small'
              variant='contained'
              color='primary'
              onClick={onConfirm}
              startIcon={<BookmarkAddIcon />}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            />
          </Box>
        </Box>
      </Paper>
    </ClickAwayListener>
  );
};
