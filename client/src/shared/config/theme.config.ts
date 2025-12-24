import { createTheme } from '@mui/material/styles';
import { APP_COLORS } from '@/shared/constants/color.constants';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: APP_COLORS['main-green'],
    },
    secondary: {
      main: APP_COLORS['dark-blue'],
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: APP_COLORS['main-green'],
            },
            '&.Mui-focused fieldset': {
              borderColor: APP_COLORS['main-green'],
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: APP_COLORS['main-green'],
          },
        },
        outlined: {
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
            borderColor: APP_COLORS['main-green'],
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: APP_COLORS['main-green'],
            color: APP_COLORS['main-white'],
            '&:hover': {
              backgroundColor: APP_COLORS['main-green'],
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: APP_COLORS['main-green'],
          },
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: APP_COLORS['main-green'],
          },
          '&:hover': {
            backgroundColor: 'rgba(31, 93, 47, 0.08)',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: APP_COLORS['main-green'],
            '& + .MuiSwitch-track': {
              backgroundColor: APP_COLORS['main-green'],
            },
          },
        },
      },
    },
  },
});

