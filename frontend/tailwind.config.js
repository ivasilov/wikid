const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx'],
  },
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono,
    },
  },
  variants: {
    margin: ['default'],
    padding: ['default'],
  },
  plugins: [],
};
