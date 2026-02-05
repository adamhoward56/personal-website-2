# Maintaining this site

## Build

```
node build.js
```

This outputs everything to `docs/`.

## Content

All content lives in the `content/` folder, organized by section:

- **About section**: Edit `content/about.md`
- **Projects**: Edit `content/projects.md`
- **Blog posts**: Add/edit markdown files in `content/blog/` with frontmatter:
  ```
  ---
  title: Post Title
  date: 2026-01-15
  description: A short summary.
  ---
  ```
- **Styling**: Edit `style.css`

## Structure

- `build.js` — static site generator
- `style.css` — source stylesheet (copied to `docs/` on build)
- `content/` — all markdown content
  - `content/about.md` — about section
  - `content/projects.md` — projects data
  - `content/blog/` — blog post markdown files
- `docs/` — built output (serve this)
