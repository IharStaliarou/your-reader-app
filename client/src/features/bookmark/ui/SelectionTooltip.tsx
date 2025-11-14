import {
  Box,
  Button,
  ClickAwayListener,
  Paper,
  Typography,
} from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import type { CSSProperties } from 'react';

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
    position: 'fixed',
    top: position.y - 10,
    left: position.x + 10,
    zIndex: 1500,
    transform: 'translateY(-100%)',
    maxWidth: 250,
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Paper elevation={8} sx={style}>
        <Box sx={{ p: 1.5 }}>
          <Typography variant='body2' sx={{ mb: 1, color: 'text.secondary' }}>
            {tooltipText}
          </Typography>
          <Button
            size='small'
            variant='contained'
            color='primary'
            onClick={onConfirm}
            startIcon={<BookmarkAddIcon />}
            fullWidth
          >
            Create Note
          </Button>
        </Box>
      </Paper>
    </ClickAwayListener>
  );
};
