# peters-pepper-co-website

Static site for Peter's Pepper Co. (peterspepperco.com), deployed from `main` via Vercel. No build step.

## Structure

| File | Purpose |
| --- | --- |
| `index.html`, `products.html`, `about.html`, `contact.html` | The four pages. Header and footer are repeated in each file. |
| `style.css` | All styling. Brand colours, fonts and shapes are tokens at the top (`:root`). |
| `script.js` | Mobile menu, header shadow, scroll reveal, footer year, a Konami-code easter egg. Site works without it. |
| `fonts/sunborn-sans-one.otf` | Brand display font (headlines, nav, buttons, prices). |
| `images/` | Logo, sauce labels, Peter's photo. `*-label.jpg` are the optimised versions used on the site. |

## Fonts

- **Sunborn** (display) is the real brand font, loaded from `fonts/`.
- **Fredoka** (body, from Google Fonts) is a **placeholder stand-in**. The original brief named "Inlander Rough" for body text, but there is no font file for it. Swap it by changing `--font-body` in `style.css` (and the Google Fonts `<link>` in each page's `<head>`).

## Adding a new sauce

Copy one of the `<article class="sauce-card ...">` blocks in `products.html`, add a `*-label.jpg` to `images/`, and set the heat level by toggling `class="on"` on the five `<i>` bars. Pick a card tint with `sauce-card--pineapple`, `--peach` or `--apricot`, or add a new `--tint-*` token.
