const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#8C70A7',
          300: '#694689',
          500: '#4D286E',
          700: '#331152',
          900: '#1E0435',
        },
        secondary: {
          100: '#CFF08E',
          300: '#ACD55A',
          500: '#8DB936',
          700: '#709A1B',
          900: '#4F7504',
        },
        alt: {
          500: '#9E1F62',
        },
        muted: '#777',
        info: '#007bff',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        link: '#278cea', // color used for links
      },
    },
    fontFamily: {
      sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono,
    },
  },
  plugins: [typography, forms],
};
