import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#111111',
          mid: '#2d2d2d',
          soft: '#555555',
          mute: '#888888',
        },
        amber: {
          brand: '#c47830',
          light: '#d4893f',
        },
        surface: {
          DEFAULT: '#f2f1ef',
          2: '#e9e8e5',
        },
        border: {
          DEFAULT: '#dddbd7',
          dark: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
      },
      lineHeight: {
        relaxed: '1.7',
      },
    },
  },
  plugins: [],
} satisfies Config;
