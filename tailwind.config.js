/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1B2B22',
          soft: '#3A4A3F',
        },
        canvas: {
          DEFAULT: '#F3F4EF',
          raised: '#FFFFFF',
        },
        harvest: {
          50: '#FDF4E4',
          100: '#FBE7C2',
          300: '#F1BE6E',
          400: '#EAAB4F',
          500: '#E8A23D',
          600: '#C97F24',
          700: '#9C611C',
        },
        basil: {
          50: '#EAF3ED',
          100: '#CFE4D7',
          300: '#7FAE8F',
          400: '#548F68',
          500: '#3F7856',
          600: '#305E43',
          700: '#234433',
        },
        chili: {
          50: '#FBEBE7',
          100: '#F2CDC3',
          300: '#DA8770',
          400: '#CC6A4F',
          500: '#C0533E',
          600: '#9F4130',
          700: '#7A3225',
        },
        slate: {
          150: '#E6E8E3',
          250: '#C9CDC5',
          450: '#8B928A',
          550: '#6B7570',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(27, 43, 34, 0.06), 0 8px 24px rgba(27, 43, 34, 0.05)',
        lifted: '0 4px 14px rgba(27, 43, 34, 0.08), 0 16px 40px rgba(27, 43, 34, 0.08)',
      },
      keyframes: {
        'scan-line': {
          '0%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(-12px) translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateY(0) translateX(-50%)' },
        },
      },
      animation: {
        'scan-line': 'scan-line 2.2s ease-in-out infinite',
        'pop-in': 'pop-in 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-in': 'toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
