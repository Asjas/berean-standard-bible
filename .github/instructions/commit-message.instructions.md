---
applyTo: "**"
---

# Commit Message Guidelines

Follow the Conventional Commits specification for all commit messages.

## Format

```
<type>(<scope>): <subject>
```

## Rules

- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
  `chore`
- **Scope**: Specify the affected area (e.g., `search`, `reader`, `theme`,
  `settings`, `routing`). Omit if broad.
- **Subject**: Short, imperative mood (e.g., "add search", not "added search").
  Under 50 characters. No trailing period. Capitalize first word.

## Examples

```
feat(search): add full-text search with Orama
fix(reader): correct poetry indentation for Psalms
docs: update PLAN.md with Phase 2 progress
style(theme): adjust paper-mode background warmth
refactor(usfm): extract footnote parsing into helper
chore: update Tailwind CSS to v4.1
```
