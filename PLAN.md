# Berean Standard Bible App — Project Plan

> **Status**: In Progress **Last Updated**: 2026-03-01

---

## Overview

A cross-platform Bible reading application built with **Tauri v2**, **Vite**,
and **React**. The app renders the full text of the **Berean Standard Bible**
(BSB) from USFM files, with full-text search, chapter/verse navigation, and a
reader-friendly interface optimized for mobile-first use.

**License**: The Berean Standard Bible text is licensed under the
[Berean Bible](https://berean.bible/) terms. This app is for personal reading
purposes.

---

## Technology Stack

| Category          | Choice                  | Version | Notes                                                   |
| ----------------- | ----------------------- | ------- | ------------------------------------------------------- |
| Desktop Framework | Tauri                   | 2.x     | Rust-based, lightweight native wrapper                  |
| Build Tool        | Vite                    | 7.x     | Fast HMR, handles static assets                         |
| UI Framework      | React                   | 19.x    | Functional components, hooks                            |
| Language          | TypeScript              | 5.x     | Strict mode                                             |
| Routing           | @tanstack/react-router  | 1.x     | File-based routing                                      |
| Styling           | Tailwind CSS            | 4.x     | Mobile-first, dark/light themes                         |
| USFM Parsing      | usfm-js                 | 3.x     | USFM ↔ JSON conversion                                  |
| Search            | @orama/orama            | 3.x     | Client-side full-text search, TypeScript-first, <2kb    |
| Font              | Literata (Google Fonts) | —       | Designed for long-form reading (Google Play Books font) |
| Package Manager   | pnpm                    | 10.x    | Fast, disk-efficient                                    |
| Code Quality      | Prettier + ESLint       | —       | Auto-formatting, linting                                |

---

## USFM Source Files

- **Location**: `bsb_usfm/` directory in the workspace root
- **Format**: USFM (Unified Standard Format Markers)
- **Files**: 66 books, named by canonical order (e.g., `01GENBSB.SFM`,
  `67REVBSB.SFM`)
- **Loading Strategy**: Copy to `public/bsb_usfm/` as static assets. The app
  fetches them via HTTP at startup, so it works both as a Tauri app and as a
  regular web app during development.

### USFM Markers Used

| Marker  | Meaning                   | Example                           |
| ------- | ------------------------- | --------------------------------- |
| `\id`   | Book identifier           | `\id GEN - Berean Standard Bible` |
| `\h`    | Header (book name)        | `\h Genesis`                      |
| `\toc1` | Table of contents (long)  | `\toc1 Genesis`                   |
| `\toc2` | Table of contents (short) | `\toc2 Genesis`                   |
| `\mt1`  | Main title                | `\mt1 Genesis`                    |
| `\c`    | Chapter number            | `\c 1`                            |
| `\v`    | Verse number              | `\v 1 In the beginning...`        |
| `\s1`   | Section heading           | `\s1 The Creation`                |
| `\s2`   | Sub-section heading       | `\s2 The First Day`               |
| `\r`    | Cross-reference heading   | `\r (John 1:1–5)`                 |
| `\q1`   | Poetry indent level 1     | Poetry formatting                 |
| `\q2`   | Poetry indent level 2     | Poetry formatting                 |
| `\f`    | Footnote                  | `\f + \fr 1:3 \ft Cited in...`    |
| `\b`    | Blank line                | Paragraph break                   |
| `\m`    | Continuation paragraph    | No first-line indent              |
| `\pmo`  | Opening embedded para     | Embedded text                     |
| `\ms`   | Major section heading     | `\ms BOOK I`                      |
| `\mr`   | Major section range       | `\mr Psalms 1—41`                 |

---

## App Architecture

### File-Based Routing Structure

```
src/routes/
├── __root.tsx            # Root layout (theme provider, font, nav shell)
├── index.tsx             # Home page: book grid + global search
├── settings.tsx          # Settings page: theme, font, font-size
└── book/
    ├── $bookId.tsx       # Book view: all chapters/verses (scrollable) + search
    └── $bookId.$chapter.$verse.tsx  # Single verse deep-link
```

### Navigation Flow

```
Home (/)
├── Lists all 66 books grouped by testament
│   ├── "Old Testament" heading → 39 OT books
│   └── "New Testament" heading → 27 NT books
├── Global search bar (searches entire Bible)
│
├── Book Page (/book/GEN)
│   ├── Shows all chapters & verses (continuous scroll)
│   ├── Book-level search bar (filters within this book)
│   ├── Chapter headings as scroll anchors
│   │
│   └── Verse Deep Link (/book/GEN/1/1)
│       └── Shows a single verse with context
│
└── Settings (/settings)
    ├── Theme: Light (paper/beige) / Dark
    ├── Font family: Literata, Source Serif 4, Lora, system
    ├── Font size: slider (14px–28px)
    └── Line height: slider (1.4–2.2)
```

### Home Page Book Listing

The home page shows all 66 books organized under two headings:

- **Old Testament** (39 books: Genesis → Malachi)
- **New Testament** (27 books: Matthew → Revelation)

Each book is a selectable card/link that navigates to the book reader page.

### Source Directory Structure

```
src/
├── routes/               # TanStack Router (file-based)
├── components/           # Reusable React components
│   ├── BookCard.tsx       # Book display card for home grid
│   ├── SearchBar.tsx      # Reusable search input
│   ├── VerseText.tsx      # Renders a single verse with formatting
│   ├── ChapterView.tsx    # Renders a full chapter
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   └── Navigation.tsx     # Back button, breadcrumbs, nav links
├── lib/
│   ├── usfm.ts           # USFM parsing utilities (wraps usfm-js)
│   ├── search.ts          # Orama search index setup and queries
│   ├── bible-data.ts      # Book metadata, canonical order, abbreviations
│   └── settings.ts        # Settings read/write from localStorage
├── hooks/
│   ├── useSearch.ts       # Search hook wrapping Orama
│   ├── useSettings.ts     # Settings hook with localStorage persistence
│   └── useBibleData.ts    # Hook for loading/caching USFM data
├── styles/
│   └── app.css           # Tailwind CSS entry + custom theme variables
└── types/
    └── bible.ts          # TypeScript types for parsed Bible data
```

---

## Data Flow

### 1. App Startup

```
App loads → Fetch all 66 .SFM files from /bsb_usfm/
         → Parse each with usfm-js into JSON
         → Extract verses with book/chapter/verse references
         → Index all verses into Orama search engine
         → Cache parsed data in memory (React context or module-level)
```

### 2. Search

```
User types query → Orama full-text search across indexed verses
                 → Returns ranked results with book/chapter/verse refs
                 → Display results with highlighted matches
                 → Click result → navigate to verse
```

### 3. Reading

```
User selects book → Load parsed chapters for that book
                  → Render all chapters in continuous scroll
                  → Section headings, poetry formatting, footnotes preserved
                  → Chapter headings are scroll anchors
```

---

## Theming

### Light Mode (Paper/Kindle)

```css
--bg-primary: #faf6f1; /* Warm cream/paper */
--bg-secondary: #f0ebe4; /* Slightly darker cream */
--text-primary: #2c2416; /* Dark brown-black */
--text-secondary: #6b5d4d; /* Medium brown */
--accent: #8b4513; /* Saddle brown */
--border: #ddd5c9; /* Warm gray */
```

### Dark Mode

```css
--bg-primary: #1a1a1a; /* Near-black */
--bg-secondary: #252525; /* Dark gray */
--text-primary: #e8e0d4; /* Warm off-white */
--text-secondary: #a89b8c; /* Muted warm gray */
--accent: #d4a574; /* Warm gold */
--border: #3a3a3a; /* Dark border */
```

---

## Settings (localStorage)

```typescript
interface AppSettings {
  theme: "light" | "dark" | "system";
  fontFamily: "Literata" | "Source Serif 4" | "Lora" | "system";
  fontSize: number; // 14–28, default 18
  lineHeight: number; // 1.4–2.2, default 1.8
}
```

---

## Task Checklist

### Phase 1: Project Setup

- [ ] Initialize Tauri v2 + Vite + React project
- [ ] Configure pnpm, TypeScript strict mode
- [ ] Install dependencies (TanStack Router, Tailwind CSS 4, usfm-js, Orama)
- [ ] Set up Prettier + ESLint with existing config
- [ ] Copy USFM files to `public/bsb_usfm/`
- [ ] Configure TanStack Router (file-based routing)
- [ ] Set up Tailwind CSS 4 with custom theme variables
- [ ] Add Google Fonts (Literata)

### Phase 2: Core Data Layer

- [ ] Create Bible metadata (book names, abbreviations, canonical order)
- [ ] Build USFM parsing utilities wrapping usfm-js
- [ ] Create TypeScript types for parsed Bible data
- [ ] Build data loading hook (fetch + parse all USFM files at startup)
- [ ] Set up Orama search index with verse data
- [ ] Create search hook

### Phase 3: UI Components

- [ ] Root layout with theme provider and navigation shell
- [ ] Home page with book grid and global search
- [ ] Book page with continuous scroll reading and chapter anchors
- [ ] Verse deep-link page
- [ ] Settings page (theme, font, font-size, line-height)
- [ ] Search results display with highlighted matches
- [ ] Verse rendering with poetry, footnotes, section headings

### Phase 4: Polish

- [ ] Mobile-first responsive styling
- [ ] Dark/light mode transitions
- [ ] Loading states and skeletons
- [ ] Keyboard navigation and accessibility
- [ ] Performance optimization (lazy loading books, virtualized scroll)

### Phase 5: Tauri Integration

- [ ] Tauri window configuration
- [ ] App icon and metadata
- [ ] Build and test native app
- [ ] Platform-specific adjustments (if needed)

---

## Design Decisions Log

| Decision          | Choice                  | Rationale                                               |
| ----------------- | ----------------------- | ------------------------------------------------------- |
| USFM Parser       | usfm-js                 | Most mature JS USFM parser, handles all BSB markers     |
| Search Engine     | @orama/orama            | Client-side, TypeScript-first, zero deps, <2kb, free    |
| Reading Font      | Literata                | Designed for long-form reading (Google Play Books font) |
| Styling           | Tailwind CSS 4          | Mobile-first, utility classes, theme variables          |
| Routing           | TanStack Router         | File-based routing, TypeScript-first, great DX          |
| File Loading      | Static assets (public/) | Works in both Tauri and web mode, simple fetch API      |
| State Persistence | localStorage            | Settings only, no server needed                         |
| Light Theme       | Paper/beige             | Kindle-like reading experience, reduces eye strain      |

---

## Notes

- The USFM files use `\pmo` (opening embedded paragraph) which is less common —
  ensure the parser handles it or fall back to plain text.
- Psalms uses `\ms` (major section) and `\mr` (major range) for the book
  divisions (Book I–V) which should be rendered as major headings.
- Footnotes (`\f ... \f*`) contain cross-references and translation notes —
  these should be rendered as expandable/collapsible elements.
- Poetry formatting (`\q1`, `\q2`) should use proper indentation levels.
