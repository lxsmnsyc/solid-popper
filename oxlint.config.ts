import config from '@lxsmnsyc/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [config],
  ignorePatterns: [
    '**/dist/**',
    '**/node_modules/**',
    '**/.vitest/**',
    '.claude/**',
    '.worktrees/**',
  ],
  overrides: [
    {
      // Tests read computed layout and cast DOM nodes.
      files: ['packages/*/test/**'],
      rules: {
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        'typescript/no-non-null-assertion': 'off',
        'typescript/no-unsafe-type-assertion': 'off',
      },
    },
    {
      // `css` from solid-styled is a tagged template used as a statement.
      files: ['examples/**'],
      rules: {
        'import/prefer-default-export': 'off',
        'no-unused-expressions': 'off',
        'typescript/explicit-function-return-type': 'off',
        'typescript/explicit-module-boundary-types': 'off',
      },
    },
  ],
});
