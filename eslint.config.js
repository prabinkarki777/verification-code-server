import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}', '**/__test__/**/*.ts', '**/*.test.ts'],
    languageOptions: {
      parser: typescriptParser,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      js,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
    },
  },
  prettierConfig,
]);
