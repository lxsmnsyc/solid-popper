import { defineConfig } from 'oxfmt';

export default defineConfig({
  singleQuote: true,
  ignorePatterns: [
    '**/dist/**',
    '**/.vitest/**',
    '.changeset/**',
    'pnpm-lock.yaml',
    '.worktrees/**',
  ],
});
