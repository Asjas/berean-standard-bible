# Berean Standard Bible App — Agent Guidance

This file provides guidance to AI coding agents (GitHub Copilot, Claude, Cursor,
Codex, Gemini, and other AI coding assistants) when working with code in this
repository.

---

## What This Repository Is

A **client-side Bible reading application** built with modern tooling:

- **Framework**: React 19 + TypeScript (strict mode)
- **Desktop**: Tauri 2.x (Rust-based native wrapper)
- **Build Tool**: Vite 7
- **Routing**: TanStack Router (file-based routing)
- **Styling**: Tailwind CSS 4 (mobile-first)
- **USFM Parsing**: usfm-js
- **Search**: @orama/orama (client-side full-text search)
- **Package Manager**: pnpm

**This is NOT a monorepo.** It is a single application. There is no backend
server or database — all data comes from static USFM files bundled with the app.

---

## High-Level Architecture

```
src/
├── routes/           # TanStack Router (file-based)
├── components/       # React components (PascalCase)
├── lib/              # Utilities: USFM parsing, search, settings, bible-data
├── hooks/            # Custom React hooks
├── styles/           # Tailwind CSS entry + custom theme variables
└── types/            # TypeScript type definitions
```

### Key Patterns

- **Static data**: The Bible text comes from 66 USFM files in
  `public/bsb_usfm/`. These are fetched at startup and parsed client-side.
- **Client-side search**: All verses are indexed into an Orama search engine at
  startup. No server-side search.
- **File-based routing**: TanStack Router with `__root.tsx`, `index.tsx`,
  `$param.tsx` conventions.
- **Functional components**: ES5 function declarations
  (`function MyComponent()` not arrows).
- **Mobile-first**: All CSS is written mobile-first with Tailwind breakpoints
  for larger screens.
- **Theming**: Light (paper/beige) and dark modes via CSS custom properties and
  Tailwind.
- **Settings persistence**: User preferences stored in `localStorage`.

---

## File Conventions

### Naming

- **Components**: PascalCase (e.g., `BookCard.tsx`, `SearchBar.tsx`)
- **Utilities/hooks**: camelCase (e.g., `useSearch.ts`, `bible-data.ts`)
- **Types**: PascalCase for type/interface names (e.g., `BibleBook`,
  `ParsedVerse`)
- **Routes**: Follow TanStack Router conventions (`index.tsx`, `$bookId.tsx`)

### TypeScript

- Strict mode enabled. No `any` — use `unknown` if unsure.
- Define explicit types for function parameters.
- Use double quotes (`"`) for strings, semicolons required.
- Prefer `const` over `let`.
- Do NOT prefix interfaces with `I`.
- Component return types are inferred — no need to specify `: JSX.Element`.

### Imports

- Do NOT use file extensions (`.js`, `.ts`, `.tsx`) in imports — Vite handles
  module resolution.
- Use `~/` path alias for `src/` directory imports.
- Order: React/external libs → internal libs → components → types → styles.

---

## Common Commands

Run from repository root. **Always use pnpm** (never npm or yarn).

```bash
# Install dependencies
pnpm install

# Development (starts Vite dev server)
pnpm dev

# Development (starts Tauri native app)
pnpm tauri dev

# Build for production
pnpm build

# Build native app
pnpm tauri build

# Format code
pnpm format

# Lint code
pnpm lint

# Type check
pnpm typecheck
```

### Validation Before Commits

Run all validation steps before committing:

```bash
pnpm format && pnpm lint && pnpm typecheck && pnpm build
```

All must pass. No exceptions.

---

## Coding Conventions

### React Components

- Use functional components exclusively. No class components.
- Define components using ES5 function declarations:

  ```tsx
  function BookCard(props: BookCardProps) {
    return <div>...</div>;
  }
  ```

- Use `export default function` for page/route components.
- Place each prop on a new line when there are more than two props.
- Use semantic HTML5 elements (`<article>`, `<section>`, `<nav>`, `<header>`,
  `<main>`) over generic `<div>`.

### Hooks

- Use React hooks appropriately (`useState`, `useEffect`, `useMemo`,
  `useCallback`).
- Custom hooks go in `src/hooks/` and start with `use` prefix.
- Avoid unnecessary `useEffect` — prefer derived state and event handlers.

### Styling

- Use Tailwind CSS utility classes. No inline styles.
- Mobile-first: start with mobile styles, add `sm:`, `md:`, `lg:` breakpoints
  for larger screens.
- Use CSS custom properties for theme colors (defined in `src/styles/app.css`).
- Use `tailwind-merge` for conditional class composition.
- Dark mode: use Tailwind's `dark:` variant.

### Bible Data

- USFM files are in `public/bsb_usfm/` — never modify these files.
- Book metadata (names, abbreviations, canonical order) is in
  `src/lib/bible-data.ts`.
- USFM parsing utilities wrap `usfm-js` — see `src/lib/usfm.ts`.
- Search utilities wrap `@orama/orama` — see `src/lib/search.ts`.

### Commit Messages

Follow Conventional Commits: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Examples:

```
feat(search): add full-text search across all books
fix(reader): correct poetry indentation for Psalms
docs: update PLAN.md with Phase 2 progress
style(theme): adjust paper-mode background warmth
```

---

## Editing Rules

1. **NEVER modify USFM files** (`bsb_usfm/` or `public/bsb_usfm/`). These are
   source data.
2. **ALWAYS run validation** (`pnpm format && pnpm lint && pnpm typecheck`)
   before committing.
3. **ALWAYS use pnpm**. Never npm or yarn.
4. When creating new routes in `src/routes/`, run the dev server once (`pnpm
   dev`) to regenerate route types.
5. **Mobile-first** — always write CSS starting from mobile viewport, then add
   breakpoints.
6. **Accessibility** — use semantic HTML, proper heading hierarchy, aria labels
   where needed, and ensure keyboard navigation works.
7. **No over-engineering** — this is a reading app. Keep it simple. No
   unnecessary abstractions.

---

## USFM Data Notes

The BSB USFM files use these markers that must be handled:

- `\v` (verse), `\c` (chapter) — core navigation units
- `\s1`, `\s2` (section headings) — render as headings between verses
- `\q1`, `\q2` (poetry) — render with indentation (Psalms, Proverbs, etc.)
- `\f ... \f*` (footnotes) — render as expandable/collapsible annotations
- `\r` (cross-references) — render below section headings
- `\b` (blank line) — paragraph break
- `\m`, `\pmo` (paragraph markers) — text flow control
- `\ms`, `\mr` (major sections) — Psalms Book divisions (Book I–V)
- `\wj ... \wj*` (words of Jesus) — may appear in NT, render distinctly if
  present

---

## Theming Reference

The app supports two themes stored in CSS custom properties:

- **Light mode**: Paper/beige tones (Kindle-like). Warm cream background, dark
  brown text.
- **Dark mode**: Near-black background, warm off-white text, gold accents.

Theme preference is stored in `localStorage` and applied via a class on the
`<html>` element.

---

## Project Plan

See [PLAN.md](PLAN.md) for the full project plan, task checklist, and design
decisions log. Update this file as progress is made.

---

## Detailed Guidance

For context-specific guidance, see the instruction files in
`.github/instructions/`:

| File                                     | Scope                   | Description                           |
| ---------------------------------------- | ----------------------- | ------------------------------------- |
| `setup-and-validation.instructions.md`   | All files               | Setup and validation steps            |
| `typescript-react.instructions.md`       | `**/*.ts, **/*.tsx`     | React + TanStack + Tailwind patterns  |
| `commit-message.instructions.md`         | All files               | Conventional Commits format           |
| `a11y.instructions.md`                   | All files               | Accessibility (WCAG 2.2 AA)           |
| `security.instructions.md`              | All files               | Security best practices               |
| `performance.instructions.md`           | All files               | Performance optimization guidelines   |
