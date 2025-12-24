import { Card, CardContent, Box, IconButton, Typography } from '@mui/material';
import {
  Description as FileIcon,
  Delete as DeleteIcon,
  Book as BookOpenIcon,
} from '@mui/icons-material';

import type { IFile } from '@/shared/interfaces/file.interface';
import { formatDate } from '@/shared/utils/date.utils';
import { LinkButton } from '@/shared/ui/LinkButton/LinkButton';

interface IFileCardProps {
  file: IFile;
  onDelete: (fileId: string) => void;
}

export const FileCard = ({ file, onDelete }: IFileCardProps) => {
  return (
    <Card
      variant='outlined'
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display='flex' alignItems='center' mb={1}>
          <FileIcon
            color='primary'
            sx={{ mr: 1, color: 'var(--main-orange)' }}
          />
          <Typography
            variant='h6'
            component='h4'
            title={file.originalName}
            sx={{ color: 'var(--main-orange)' }}
          >
            {file.originalName}
          </Typography>
        </Box>

        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          Uploaded: {formatDate(file.createdAt)}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          {/* TODO: add calc file size fn */}
          Size: {(file.fileSize / 1024 / 1024).toFixed(2)} MB
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          pt: 0,
        }}
      >
        <LinkButton
          to={`/files/${file.id}`}
          label='Read'
          startIcon={<BookOpenIcon />}
          sx={{ flexGrow: 1, mr: 1 }}
        />
        <IconButton
          sx={{
            color: 'var(--main-orange)',
          }}
          aria-label='delete file'
          onClick={() => onDelete(file.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};
