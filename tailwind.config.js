/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ivory: {
          50: '#FDFCF8',
          100: '#FAF8F0',
          200: '#F5F0E0',
        },
        ink: {
          900: '#0F0E0A',
          800: '#1C1A14',
          700: '#2E2B20',
          600: '#44402F',
        },
        gold: {
          300: '#D4B483',
          400: '#C9A55A',
          500: '#B8943E',
          600: '#9E7D2C',
        },
        sage: {
          400: '#7A9E7E',
          500: '#5F8B64',
          600: '#4A7050',
        },
        crimson: {
          400: '#C4544A',
          500: '#B03E34',
          600: '#8F2E25',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
