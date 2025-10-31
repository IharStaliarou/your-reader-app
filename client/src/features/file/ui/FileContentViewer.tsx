import { Typography, Paper } from '@mui/material';

interface IFileContentViewerProps {
  content: string;
}

export const FileContentViewer = ({ content }: IFileContentViewerProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        backgroundColor: '#f5f5f5',
        whiteSpace: 'pre-wrap',
        maxHeight: '70vh',
        overflow: 'auto',
        border: '1px solid #ddd',
      }}
    >
      <Typography
        component='pre'
        sx={{ fontFamily: 'monospace', fontSize: '14px' }}
      >
        {content}
      </Typography>
    </Paper>
  );
};
