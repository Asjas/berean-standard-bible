# Copilot Instructions

This is a **Berean Standard Bible reading app** built with Tauri v2, Vite, React
19, TanStack Router, Tailwind CSS 4, and TypeScript.

## Quick Reference

- **Package manager**: pnpm (never npm or yarn)
- **Routing**: TanStack Router (file-based, `src/routes/`)
- **Styling**: Tailwind CSS 4 (mobile-first, dark/light themes)
- **Bible data**: USFM files in `public/bsb_usfm/`, parsed with `usfm-js`
- **Search**: @orama/orama (client-side full-text search)
- **Settings**: `localStorage` (theme, font, font-size, line-height)
- **Font**: Literata (Google Fonts, reading-optimized)

## Code Style

- TypeScript strict mode. No `any`.
- Double quotes, semicolons, trailing commas.
- Functional components with ES5 function declarations.
- Imports: no file extensions, use `~/` path alias for `src/`.
- Semantic HTML over `<div>`.

## Key Files

- [PLAN.md](PLAN.md) — Full project plan and task checklist
- [AGENTS.md](AGENTS.md) — Detailed agent guidance
- `.github/instructions/` — Context-specific instruction files

## Before Committing

```bash
pnpm format && pnpm lint && pnpm typecheck && pnpm build
```
