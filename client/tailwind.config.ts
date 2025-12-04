import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  prefix: 'tw-',

  theme: {
    extend: {
      colors: {
        'main-orange': '#FF7B4E',
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
      backgroundImage: {
        'gradient-orange':
          'linear-gradient(171.6deg, rgb(255, 123, 78), rgb(255, 88, 78) 100%)',
        'gradient-orange-with-white':
          'linear-gradient(171.6deg, rgb(255, 123, 78), rgb(255, 88, 78) 100%), rgb(255, 255, 255)',
      },
      backgroundColor: {
        'orange-gradient':
          'linear-gradient(171.6deg, rgb(255, 123, 78), rgb(255, 88, 78) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
