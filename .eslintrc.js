module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-multiple-empty-lines': [2, {max: 2}],
    semi: [2, 'always'],
    curly: 'warn',
    'prefer-template': 'warn',
    camelcase: 0,
    'no-return-assign': 0,
    quotes: ['warn', 'single'],
    // indent: ['warn', 2],
    // 'no-unused-vars': ['warn'],
    eqeqeq: ['warn', 'always'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-unresolved': 0,
    '@typescript-eslint/no-unused-vars' : 'off',
    'react-native/no-inline-styles' : 'off',
    'no-floating-decimal' : 'off',
    ''
  }
};
