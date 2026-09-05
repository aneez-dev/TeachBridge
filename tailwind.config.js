/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cloud: '#F5F1E8',
        paper: '#FCFAF5',
        ink: '#1E293B',
        teal: {
          DEFAULT: '#0F6E64',
          dark: '#0B5049',
          soft: '#E1EFEA',
          line: '#BFE0D8',
        },
        apricot: {
          DEFAULT: '#D97D48',
          soft: '#FBE6D6',
          line: '#F0C39D',
        },
        rule: '#E4DECF',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 1px 2px rgba(30, 41, 59, 0.04), 0 8px 24px -12px rgba(30, 41, 59, 0.12)',
      },
    },
  },
  plugins: [],
}
