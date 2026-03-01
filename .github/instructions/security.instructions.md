---
applyTo: "**"
description: "Security best practices for client-side application"
---

# Security Guidelines

## General Principles

- This is a client-side-only application with no backend. Security concerns are
  primarily around XSS, dependency safety, and content injection.

## Content Security

- USFM files are trusted static content bundled with the app. However, always
  sanitize parsed text before rendering.
- Use React's built-in XSS protection (JSX auto-escapes). Never use
  `dangerouslySetInnerHTML` unless absolutely necessary, and sanitize content
  first with a library like DOMPurify.
- Do not render user-generated content. The app only displays parsed USFM data.

## Dependencies

- Keep dependencies up to date. Use Renovate for automated updates.
- Run `pnpm audit` periodically to check for known vulnerabilities.
- Prefer well-maintained, widely-used packages.

## localStorage

- Only store non-sensitive preferences (theme, font, font-size).
- Never store authentication tokens or personal data.

## Tauri-Specific

- Follow Tauri's security recommendations for capability permissions.
- Minimize the Tauri API surface — only enable capabilities the app needs.
- Do not expose the filesystem API unless required.

## Content Security Policy

- When deploying as a web app, set appropriate CSP headers.
- Allow Google Fonts CDN for font loading.
- Restrict scripts to same-origin.
