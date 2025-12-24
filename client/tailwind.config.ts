import type { Config } from 'tailwindcss';
import { APP_COLORS } from './src/shared/constants/color.constants';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  prefix: 'tw-',

  theme: {
    extend: {
      colors: APP_COLORS,
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
      },
      animation: {
        blink: 'blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slow-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-green-soft':
          `linear-gradient(171.6deg, ${APP_COLORS['main-green']}, ${APP_COLORS['dark-blue']} 40%, ${APP_COLORS['main-white']} 100%)`,
      },
      backgroundColor: {
        'green-gradient':
          `linear-gradient(171.6deg, ${APP_COLORS['main-green']}, ${APP_COLORS['dark-gray']} 60%, ${APP_COLORS['main-white']} 100%)`,
      },
    },
  },
  plugins: [],
};

export default config;
