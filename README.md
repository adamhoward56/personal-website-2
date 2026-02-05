# Personal Website

A simple static personal website with a blog.

## Usage

```
npm install
npm run build
```

This generates static HTML in `docs/`. Open `docs/index.html` to preview locally.

## Blog Posts

Add markdown files to `posts/` with frontmatter:

```md
---
title: "Post Title"
date: "2026-01-25"
description: "A short description."
---

Your content here...
```

Then run `npm run build` and push to deploy.

## Deploy

GitHub Pages serves from the `docs/` folder on the `main` branch.
