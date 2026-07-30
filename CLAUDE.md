# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static marketing website for Peter's Pepper Co., a small handmade hot sauce business. There is no framework, build step, package manager, or backend — just hand-authored HTML, one shared CSS file, and one shared JS file, served as static files.

## Development workflow

There are no build/lint/test commands — there is no `package.json` or tooling of any kind in this repo. To work on the site:

- Preview locally by opening the HTML files directly in a browser, or serve the directory with any static file server, e.g. `python3 -m http.server` from the repo root.
- There is no test suite, linter, or CI to run. Verify changes by loading the affected page(s) in a browser.

## Site structure

Four top-level pages, all siblings in the repo root, each linking the same shared `style.css` and `script.js`:

- `index.html` — homepage (hero, featured products, "Our Story" CTA)
- `products.html` — full product catalog with heat-level meters
- `about.html` — company story and values
- `contact.html` — contact info and an embedded Google Forms iframe for the contact form (there is no server-side form handling in this repo)

Supporting assets:

- `style.css` — single stylesheet for all pages, organized in sections by page (general/layout, home, about, footer, products) appended in the order features were added
- `script.js` — single shared script, loaded on every page
- `images/` — product label PNGs and logo images
- `fonts/` — `sunborn-sans-one.otf`, the brand display font

## Important quirks to know before editing

**Header markup is inconsistent between pages.** `index.html` uses a different header structure (`<div class="logo"><img>` + bare `<nav><ul>`) than `products.html`, `about.html`, and `contact.html` (which use `<nav><div class="logo"><h1>` + `<ul class="nav-links">` with an `active` class marking the current page). When editing navigation, check which pattern the specific page uses rather than assuming they're the same, and note that `index.html`'s nav doesn't mark an active link.

**`script.js` is a vestigial "racing theme" script and mostly dead code.** Its comments and function names ("Racing Theme JavaScript", `.fuel-card`, `.turbo-btn`, `.speedometer`, `.mobile-menu-btn`, "Fuel Selected!" popup, Konami-code racing mode) reference a car-racing UI concept that does not exist anywhere in the current HTML/CSS. None of the current pages have matching elements, so nearly all of `initInteractiveElements`, `initPerformanceCounters`, `initMobileMenu`, etc. are no-ops on every existing page — they only bind to selectors that aren't present. Only `initNavigation`'s smooth-scroll-for-`#anchor`-links behavior and the Konami-code easter egg run in practice. Don't assume functions in this file describe real site behavior; check whether their target selectors actually exist in the HTML before relying on or extending them.

**Font loading in `style.css` has a duplicate, order-dependent `body` rule.** Near the top, `body` is set to `font-family: 'Roboto', sans-serif` (a stated placeholder for a brand font called "Inlander Rough" that isn't actually included in the repo). Near the bottom of the file, after the `@font-face` declaration for `'Sunborn'` (backed by `fonts/sunborn-sans-one.otf`), a second `body { font-family: 'Sunborn', sans-serif; }` rule silently overrides the first because it comes later in the cascade. If you touch body typography, edit the rule at the bottom of the file, not the one near the top.

**Product content is duplicated across pages.** `index.html`'s "Featured Products" section and `products.html`'s full catalog both hardcode the same product names/descriptions independently — there's no shared data source, so updating a product (name, price, description) means editing both files.
