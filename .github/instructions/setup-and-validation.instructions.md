---
applyTo: "**"
description: "Setup and validation steps that MUST be run before EVERY commit"
priority: 1
---

# Setup and Validation

## Initial Setup

### 1. Install pnpm

If pnpm is not found, install it:

```bash
npm install -g pnpm@latest
```

### 2. Install dependencies

```bash
pnpm install
```

**NEVER use npm or yarn**. Always use pnpm.

## Validation Steps — REQUIRED Before EVERY Commit

Run all steps in order:

### 1. Format code

```bash
pnpm format
```

### 2. Lint code

```bash
pnpm lint
```

### 3. Type check

```bash
pnpm typecheck
```

### 4. Build

```bash
pnpm build
```

### Run All Together

```bash
pnpm format && pnpm lint && pnpm typecheck && pnpm build
```

**All must pass before committing. No exceptions.**

## When Commands Fail

1. **DO NOT COMMIT**
2. Fix the errors first
3. Run validation again
4. Only commit when ALL steps pass

## Route Generation

When creating new routes in `src/routes/`, start the dev server once
(`pnpm dev`) so TanStack Router generates the route tree file
(`routeTree.gen.ts`). Stop the server after the file is generated.

## Common Mistakes to AVOID

- NEVER skip validation steps
- NEVER commit when validation fails
- NEVER manually fix formatting — use `pnpm format`
- NEVER use npm or yarn — always use pnpm
- NEVER modify USFM source files in `bsb_usfm/` or `public/bsb_usfm/`
