# Code Challenges

A small React + TypeScript app answering three frontend code challenges, deployed to GitHub Pages.

**Live site:** https://simpscal.github.io/code-challenges/

## Problems

| # | Problem | Route |
|---|---------|-------|
| 1 | [Sum to n](./code-challenges.md) — three implementations, compared live | `/problem-1` |
| 2 | Currency swap form, backed by a live price feed | `/problem-2` |
| 3 | Refactor: anti-patterns found and fixed in a React + TypeScript component | `/problem-3` |

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4 + shadcn/ui, React Router, TanStack Query, React Hook Form + Zod, Shiki (syntax highlighting), MSW (mocks the swap-submit endpoint — there is no real backend), Vitest + Testing Library.

## Development

```bash
bun install
bun dev            # start the dev server
bun run lint       # eslint
bun run typecheck  # tsc project references
bun run test       # vitest
bun run build      # production build to dist/
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to GitHub Pages via the official Pages Actions. `.github/workflows/ci.yml` runs lint/typecheck/test on every push and pull request.
