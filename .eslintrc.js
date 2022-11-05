module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint', 'react-hooks', 'import', 'react', 'simple-import-sort'],
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:@next/next/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  ignorePatterns: ['src/components/Omnimerse/cms/Frontend/omnistudio-frontend-components/*'],
  rules: {
    'simple-import-sort/imports': 'error',
    'sort-imports': 'off',
    'import/first': 'error',
    'import/order': 'off',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@next/next/no-img-element': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
