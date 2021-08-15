module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jquery: {
      globals: {
        $: true,
      },
    },
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
};
