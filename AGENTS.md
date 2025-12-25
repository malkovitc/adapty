# Repository Guidelines

## Project Structure & Module Organization
Keep App Router code in `app/` and group features, e.g., `app/(marketing)/pricing/page.tsx`. House reusable UI in `src/components/`, shared logic in `src/lib/`, and any service clients under `src/services/`. Static content (icons, OG images, fonts) belongs in `public/`, imported via root-relative paths for cache busting. Use `.playwright-mcp/` strictly for generated Playwright assets while real specs stay in `tests/e2e` and mirror the route tree. Ignore cache directories such as `.next/`.

## Build, Test, and Development Commands
Install dependencies with `npm install` (no lockfile ships with this snapshot, so use the stock npm client). Use `npm run dev` for the local server on `localhost:3000`. Run `npm run lint` before committing to enforce the Next.js ESLint preset. Build production bundles via `npm run build`, then smoke-test with `npm run start`. Execute user journeys with `npm run test:e2e`, and keep lighter suites behind `npm run test` when you add Vitest/Jest coverage.

## Coding Style & Naming Conventions
Write components in TypeScript, defaulting to Server Components and opting into `use client` only when necessary. Stick to 2-space indentation, trailing commas, and single quotes; run Prettier through the `npm run lint` step. File casing follows intent: React components as `PascalCase.tsx`, hooks/utilities as `camelCase.ts`, and route folders in kebab-case. Keep props and API payloads typed, export helpers explicitly, and reserve comments for behavior that is not self-evident.

## Testing Guidelines
Mirror every user-facing feature with at least one Playwright spec inside `tests/e2e/<area>/<feature>.spec.ts`; stub external services with fixtures and capture screenshots when visual states change. For unit coverage, colocate tests in `src/__tests__` or next to the module as `<name>.test.ts` so Vitest/Jest can pick them up via `npm run test`. Target the key SaaS funnel paths (signup, paywall, onboarding) and watch coverage hover near 80% statements and branches.

## Commit & Pull Request Guidelines
The `.git` directory is not bundled here, so default to Conventional Commits (`feat: add pricing cards`, `fix: guard paywall CTA`) to match upstream history. Keep commits focused and explain config or build edits in the body. Pull requests need a short summary, screenshots or video for visual tweaks, a checklist of commands you ran (`npm run lint`, `npm run test:e2e`), and links to the relevant issue. Call out breaking changes or follow-up tasks before requesting review.
