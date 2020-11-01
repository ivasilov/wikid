module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {
    margin: ['default'],
    padding: ['default'],
  },
  plugins: [],
  corePlugins: [
    'preflight', // 13 kb
    'container', // 0.3 kb
    'display', // 4 kb
    'margin', // 63 kb -> 11 kb (with default variant)
    'alignSelf', // 1 kb
    'gridTemplateColumns', // 4 kb
    'gridColumn', // 3 kb
    'padding', // 31 kb -> 6 kb (with default variant)
    'flex', // 0.8 kb
    'fontWeight', // 7 kb
    'flexGrow', // 0.3 kb
    'justifyContent', // 1 kb
  ],
};
