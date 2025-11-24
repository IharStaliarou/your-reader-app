import {
  Card,
  CardContent,
  Box,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';
import FileIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import BookOpenIcon from '@mui/icons-material/Book';

import type { IFile } from '@/shared/interfaces/file.interface';
import { formatDate } from '@/shared/utils/date.utils';
import { LinkButton } from '@/shared/ui/LinkButton/LinkButton';

interface IFileCardProps {
  file: IFile;
  onDelete: (fileId: string) => void;
}

export const FileCard = ({ file, onDelete }: IFileCardProps) => {
  return (
    // TODO: fix conflict
    // @ts-ignore
    <Grid item xs={12} sm={6} md={4} lg={3}>
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
            <FileIcon color='primary' sx={{ mr: 1 }} />
            <Typography
              variant='h6'
              component='div'
              noWrap
              title={file.originalName}
            >
              {file.originalName}
            </Typography>
          </Box>

          <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
            Uploaded: {formatDate(file.createdAt)}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
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
            variant='contained'
            color='primary'
            startIcon={<BookOpenIcon />}
            size='small'
            sx={{ flexGrow: 1, mr: 1 }}
          />
          <IconButton
            color='error'
            aria-label='delete file'
            onClick={() => onDelete(file.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
};
