import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  prefix: 'tw-',

  theme: {
    extend: {
      colors: {
        'primary-brand': '#2196F3',
        'secondary-brand': '#FFC107',
        'app-background': '#f7f9fc',
      },
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
    },
  },
  plugins: [],
};

export default config;
