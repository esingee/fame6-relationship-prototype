import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#9C1D27', dark: '#6E1219', accent: '#C8A15A', tint: '#F8E9EA' },
        app: '#FFFFFF',
        gold: '#E9B83C',
        soft: '#F6F3F2',
        ink: { DEFAULT: '#1F1F1F', soft: '#5E5E5E' },
        ok: { DEFAULT: '#2E7D4F', tint: '#E4F2EA' },
        info: { DEFAULT: '#2B5DAA', tint: '#E5EDF8' },
        warn: { DEFAULT: '#B26A00', tint: '#FBEFD9' },
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'] },
      fontSize: { base: ['14px', '1.5'], sm: ['13px', '1.45'] },
      boxShadow: { card: '0 0 0 1px #ECE8E6' },
    },
  },
  plugins: [],
} satisfies Config;
