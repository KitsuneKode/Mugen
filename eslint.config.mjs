import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',

      // Disable display-name rule for React components
      'react/display-name': 'off',
      'import/no-anonymous-default-export': 'off',

      // Optional: Allow anonymous functions if needed
      'func-names': 'off',
    },
  },
];

export default eslintConfig;
