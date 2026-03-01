---
applyTo: "**/*.ts, **/*.tsx, **/*.css"
description: "Guidelines for building React components with TanStack Router, Tailwind CSS, and TypeScript"
---

# React + TypeScript Development Instructions

## Project Context

- React 19 with TypeScript (strict mode)
- TanStack Router for file-based routing
- Tailwind CSS 4 for styling (mobile-first)
- Vite 7 as build tool
- usfm-js for USFM parsing
- @orama/orama for client-side search

## Component Structure

- Use functional components exclusively. No class components.
- Define components using ES5 function declarations:

  ```tsx
  function BookCard(props: BookCardProps) {
    return <div>...</div>;
  }
  ```

- Use `export default function` for route page components.

## TypeScript Usage

- Define types for component props (e.g., `BookCardProps`).
- Do NOT prefix interfaces with `I`.
- Specify parameter types for all function parameters.
- Use explicit types over `any`. Prefer `unknown` when type is unclear.
- Component return types are inferred — no need to specify `: JSX.Element`.

## Naming Conventions

- PascalCase for component files and names (`BookCard.tsx`)
- camelCase for utilities, hooks, variables, functions
- Use descriptive names. Avoid abbreviations unless widely understood.

## Imports

- Do NOT use file extensions (`.js`, `.ts`, `.tsx`) in imports.
- Use `~/` path alias for `src/` imports.
- Order: React/external → internal libs → components → types → styles

## TanStack Router Patterns

- File-based routing in `src/routes/`.
- Root layout: `__root.tsx`.
- Index routes: `index.tsx`.
- Dynamic params: `$param.tsx` (e.g., `$bookId.tsx`).
- After creating a new route file, run `pnpm dev` once to generate types.

## Styling

- Use Tailwind CSS utility classes. No inline styles.
- Mobile-first: write mobile styles first, add `sm:`, `md:`, `lg:` breakpoints.
- Dark mode: use `dark:` variant.
- Theme colors use CSS custom properties defined in `src/styles/app.css`.
- Use `tailwind-merge` for conditional class merging.

## Code Style

- Double quotes (`"`) for strings. Semicolons required.
- Prefer `const` over `let`.
- Place each prop on a new line when there are more than two props.
- Use semantic HTML5 elements (`<article>`, `<section>`, `<nav>`, `<header>`,
  `<main>`) over generic `<div>`.

## Bible Data Handling

- USFM files are static assets in `public/bsb_usfm/` — never modify them.
- Parse USFM with `usfm-js` via utilities in `src/lib/usfm.ts`.
- Book metadata (names, order, abbreviations) in `src/lib/bible-data.ts`.
- All verses are indexed into Orama at startup for full-text search.

## Accessibility

- Use semantic HTML and proper heading hierarchy.
- All interactive elements must be keyboard accessible.
- Use `aria-label` where the visual label is insufficient.
- Ensure sufficient color contrast in both themes.
- Images/icons need `alt` text or `aria-hidden="true"`.
