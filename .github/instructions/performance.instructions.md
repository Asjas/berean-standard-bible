---
applyTo: "**"
description: "Performance optimization guidelines for Bible reading app"
---

# Performance Optimization

## Startup Performance

- The app must load all 66 USFM files at startup to build the search index.
  Optimize this:
  - Fetch files in parallel using `Promise.all` (or batched `Promise.allSettled`).
  - Parse USFM in a non-blocking manner (consider chunking with
    `requestIdleCallback` or `setTimeout`).
  - Show a loading indicator during initial parse.

## Search Performance

- Orama search is fast, but indexing 31,000+ verses takes time.
- Build the search index asynchronously after initial render.
- Debounce search input (300ms) to avoid excessive queries.
- Limit search results displayed (show top 50, load more on scroll).

## Rendering Performance

- Use `React.memo` for components that receive stable props (e.g., verse
  display).
- Avoid re-rendering the entire book when scrolling — consider virtualized
  lists for books with many chapters (e.g., Psalms has 150 chapters).
- Lazy-load book content only when navigating to that book.
- Use `useMemo` for expensive computations (e.g., filtering, formatting).

## Bundle Size

- Tailwind CSS 4 purges unused styles automatically.
- Use dynamic imports for route-level code splitting (TanStack Router handles
  this with lazy routes).
- Monitor bundle size — the app should be lightweight.

## Images and Assets

- Use optimized formats (SVG for icons, WebP for images if any).
- Preload the primary font (Literata) to avoid FOUT.

## Caching

- USFM files are static and can be aggressively cached.
- Parsed Bible data should be cached in module-level variables (not re-parsed
  on every navigation).
- Search index should persist in memory for the app lifetime.
