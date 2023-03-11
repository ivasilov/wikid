module.exports = {
  extends: ['next/core-web-vitals'],
  plugins: ['import'],
  rules: {
    '@next/next/no-img-element': 'off',
    'require-await': 'error',
    'import/no-extraneous-dependencies': ['error', { packageDir: __dirname }],
  },
};
