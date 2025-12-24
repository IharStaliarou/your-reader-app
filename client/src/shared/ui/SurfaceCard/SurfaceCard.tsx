import { Paper, type PaperProps } from '@mui/material';
import { APP_COLORS } from '@/shared/constants/color.constants';

export interface ISurfaceCardProps extends PaperProps {
  hover?: boolean;
  padding?: string | number;
}

export const SurfaceCard = ({
  children,
  hover = true,
  padding = 'var(--space-md)',
  sx,
  ...rest
}: ISurfaceCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: APP_COLORS.paper,
        borderRadius: 'var(--radius-lg)',
        border: `1px solid rgba(27, 23, 22, 0.08)`,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        padding,
        transition: hover
          ? 'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease'
          : undefined,
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 14px 36px rgba(0, 0, 0, 0.08)',
            borderColor: 'rgba(27, 23, 22, 0.14)',
          },
        }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
};
