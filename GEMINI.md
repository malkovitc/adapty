# Adapty Website Project Context

## Project Overview
This is the repository for the **Adapty Website**, a generic marketing and documentation site built with **Next.js 16**. It includes a built-in CMS for blog management powered by **Sanity**.

**Primary Goal:** Provide a marketing platform and blog for Adapty (Revenue Management for In-App Purchases).

## Tech Stack
- **Framework:** [Next.js 16.1.0](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Framer Motion (animations)
- **CMS:** [Sanity](https://www.sanity.io/)
- **Testing:** Playwright (E2E)
- **Icons:** Lucide React
- **Graphics:** Three.js / React Three Fiber

## Key Directories
- **`src/app/`**: Next.js App Router pages and layouts.
  - `src/app/cms/`: The internal CMS interface.
- **`src/components/`**: Reusable UI components.
  - `src/components/cms/`: specific components for the CMS page (recently refactored).
- **`src/sanity/`**: Sanity configuration, schemas, and client utilities.
- **`e2e/`**: Playwright end-to-end tests.
- **`public/`**: Static assets (images, SVGs).

## Development Workflow

### Scripts
| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the development server at `http://localhost:3000`. |
| `npm run build` | Build the application for production. |
| `npm run start` | Start the production server. |
| `npm run lint` | Run ESLint. |
| `npm run test` | Run Playwright E2E tests (headless). |
| `npm run test:ui` | Run Playwright tests with UI. |

### Environment Variables
The application relies on environment variables for Sanity configuration (see `src/sanity/client.ts`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_TOKEN` (for write operations)

## Recent Context: CMS Refactor
**Date:** December 2025
The CMS page (`src/app/cms/page.tsx`) underwent a major refactor to split a monolithic file into smaller components.
- **New Location:** `src/components/cms/`
- **Documentation:** See `CMS_REFACTOR_COMPLETE.md` and related files for architectural details.

## Conventions
- **Styling:** Use Tailwind utility classes.
- **Components:** Functional components with TypeScript interfaces for props.
- **Importing:** Use `@/` alias for imports from `src/` (e.g., `import ... from '@/components/...'`).
